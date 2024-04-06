// will ping the network and fetch the price of token
import { Web3 } from 'web3';
import routerV2Abi from '../../../common/abi/routerV2.abi';
// import tokenAbi from '../../../common/abi/eth-token.abi.json';
import { config } from '../../../config';
import { PriceHistory, PriceHistoryDocument } from '../entities/price.entity';
import { Model, Types } from 'mongoose';
import { Token } from '../entities/token.entity';
import { TokenService } from '../token.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import event from '../event';

const tokenAbi = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
@Injectable()
export class PriceService {
  private bscNodeWeb3 = new Web3(config.BSC.nodeUrl);
  private tokenList: Token[];

  constructor(
    @InjectModel(PriceHistory.name)
    private readonly priceHistoryModel: Model<PriceHistoryDocument>,
    private readonly tokenService: TokenService,
  ) {
    event.on('token.created', (token) => this.tokenList.push(token));
    this.init();
  }

  async calcBNBPrice(): Promise<number> {
    const BNBTokenAddress = config.BSC.bnbAddress; // this is wrap bnb, price of wrap bnb is always equal to bnb
    const USDTokenAddress = config.BSC.usdtAddress;
    return await this.calcTokenPrice(BNBTokenAddress, USDTokenAddress);
  }

  /**
   * given amount of tokenOut for 1 tokenIn
   * @param tokenIn token whose price need to be find out
   * @param tokenOut
   * @returns
   */
  async calcTokenPrice(tokenIn: string, tokenOut: string): Promise<number> {
    const bnbToSell = this.bscNodeWeb3.utils.toWei('1', 'ether');
    let amountOut;
    try {
      const router = await new this.bscNodeWeb3.eth.Contract(
        routerV2Abi,
        config.pancakeSwapRouterV2.BSC,
      );
      amountOut = await router.methods
        .getAmountsOut(bnbToSell, [tokenIn, tokenOut])
        .call();
      amountOut = this.bscNodeWeb3.utils.fromWei(amountOut[1], 'ether');
    } catch (error) {}
    if (!amountOut) return 0;
    return amountOut;
  }

  async calcSell(tokensToSell, tokenAddres) {
    // const web3 = new Web3("https://bsc-dataseed1.binance.org"); // bsc
    // const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB
    const BNBTokenAddress = config.BSC.bnbAddress;
    const tokenRouter = await new this.bscNodeWeb3.eth.Contract(
      tokenAbi,
      tokenAddres,
    );
    const tokenDecimals = await tokenRouter.methods.decimals().call();

    tokensToSell = this.setDecimals(tokensToSell, tokenDecimals);
    let amountOut;
    try {
      const router = await new this.bscNodeWeb3.eth.Contract(
        routerV2Abi,
        config.pancakeSwapRouterV2.BSC,
      );
      amountOut = await router.methods
        .getAmountsOut(tokensToSell, [tokenAddres, BNBTokenAddress])
        .call();
      amountOut = this.bscNodeWeb3.utils.fromWei(amountOut[1], 'ether');
    } catch (error) {}

    if (!amountOut) return 0;
    return amountOut;
  }

  setDecimals(number, decimals) {
    number = number.toString();
    const numberAbs = number.split('.')[0];
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while (numberDecimals.length < decimals) {
      numberDecimals += '0';
    }
    return numberAbs + numberDecimals;
  }

  async getTokenTotalSupply(tokenAddress: string) {
    const tokenRouter = await new this.bscNodeWeb3.eth.Contract(
      tokenAbi,
      tokenAddress,
    );
    const totalSupply: number = await tokenRouter.methods.totalSupply().call();
    console.log(totalSupply, totalSupply.toLocaleString());
    return totalSupply;
  }

  async syncTokenPrice() {
    setInterval(async () => {
      try {
        await Promise.all(
          this.tokenList.map(async (token) => {
            const tokenAddress = token.tokenAddress.toLowerCase();
            const bnbPrice = await this.calcBNBPrice();
            const tokens_to_sell = 1;
            const priceInBnb =
              (await this.calcSell(tokens_to_sell, tokenAddress)) /
              tokens_to_sell; // calculate TOKEN price in BNB
            console.log(
              'SHIT_TOKEN VALUE IN BNB : ' +
                priceInBnb +
                ' | Just convert it to USD ',
            );
            const tokenPriceInUsd = priceInBnb * bnbPrice; // convert the token price from BNB to USD based on the retrived BNB value
            this.addTokenPrice(token._id, tokenPriceInUsd);
          }),
        );
      } catch (err) {}
    }, 120000);
  }

  async addTokenPrice(tokenId: Types.ObjectId, price: number) {
    await this.priceHistoryModel.findOneAndUpdate(
      {
        token: tokenId,
      },
      {
        $push: {
          priceHistory: {
            time: Date.now(),
            value: price,
          },
        },
        currentPriceInUsd: price,
      },
      { upsert: true, new: true },
    );
  }

  async init() {
    this.tokenList = await this.tokenService.findAll();
    // console.log(this.tokenList);
    await this.syncTokenPrice();
  }

  // @OnEvent('token.created')
  // handleTokenCreatedEvent(event: TokenCreatedEvent) {
  //   this.tokenList.push(event);
  // }

  async getCurrentPrice(tokenId: Types.ObjectId) {
    try {
      const priceHistory = await this.priceHistoryModel
        .findOne({
          token: tokenId,
        })
        .populate('token')
        .lean();
      if (!priceHistory) throw new NotFoundException('Token price not found');
      // find one 1hr change
      const oneHrChange = this.getDurationChange(priceHistory, 1);
      const oneDayChange = this.getDurationChange(priceHistory, 24);
      // find 24hr change

      return {
        currentPriceInusd: priceHistory.currentPriceInUsd,
        oneHrChange: oneHrChange,
        oneDayChange: oneDayChange,
      };
    } catch (error) {
      throw error;
    }
  }

  getDurationChange(priceHistory: PriceHistory, durationInHr: number): number {
    const length = priceHistory.priceHistory.length;
    const lastPrice = priceHistory.priceHistory[length - 1];
    const hoursAgoIndex = Math.max(length - durationInHr * 60, 0); // Ensure index is non-negative
    const durationAgoPrice = priceHistory.priceHistory[hoursAgoIndex];

    // Calculate 1-hour change
    return (
      (100 * (lastPrice['value'] - durationAgoPrice['value'])) /
      lastPrice['value']
    );
  }

  async getPriceSeries(tokenId: Types.ObjectId) {
    const priceHisotry = await this.priceHistoryModel.findOne({
      token: tokenId,
    });
    return priceHisotry;
  }
}
