import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { PaginationOptionDto } from 'src/common/dto/pagination-option.input';
import { Chain, ChainDocument } from './entities/chain.entity';
import { CreateChainDto } from './dto/create-chain.dto';
import { ChainStatus } from 'src/types/chain-status.enum';

@Injectable()
export class ChainService {
  constructor(
    @InjectModel(Chain.name) private readonly chainModel: Model<ChainDocument>,
    private readonly i18nService: I18nService,
  ) {}

  async createChain(createChainInput: CreateChainDto): Promise<Chain> {
    try {
      const chain = await this.chainModel.create(createChainInput);
      return chain.toObject();
    } catch (error) {
      console.log('unexpected error occured while creating new Chain');
      throw error;
    }
  }

  async getChainById(_id: Types.ObjectId): Promise<Chain | null> {
    try {
      return await this.chainModel.findById(_id);
    } catch (error) {
      console.log('unexpected error occured while creating new Chain');
      throw error;
    }
  }
  /**
   * fetch Chain based on `name` and `pagination`
   * @param name name of the Chain
   * @param option
   * @returns Promise resolving into list of Chain
   */
  async getChains(
    filterQuery: FilterQuery<Chain>,
    option: PaginationOptionDto,
  ) {
    const { pageNo, limit } = option;
    const [chains, totalCount] = await Promise.all([
      this.chainModel
        .find(filterQuery)
        .skip((pageNo - 1) * limit)
        .limit(limit)
        .lean(),
      this.chainModel.find(filterQuery).countDocuments(),
    ]);
    return {
      chains,
      totalCount,
    };
  }

  async getActiveChains(paginationOption: PaginationOptionDto) {
    const filterQuery: FilterQuery<ChainDocument> = {};
    filterQuery.status = ChainStatus.ACTIVE;
    paginationOption.search
      ? (filterQuery.name = {
          $regex: paginationOption.search.trim(),
          $options: 'i',
        })
      : null;
    return this.getChains(filterQuery, paginationOption);
  }

  async getAllChains(paginationOption: PaginationOptionDto) {
    const filterQuery: FilterQuery<ChainDocument> = {};
    paginationOption.search
      ? (filterQuery.name = {
          $regex: paginationOption.search.trim(),
          $options: 'i',
        })
      : null;
    return await this.getChains(filterQuery, paginationOption);
  }

  async updateChainById(
    _id: Types.ObjectId,
    updateQuery: UpdateQuery<ChainDocument>,
  ) {
    try {
      return await this.chainModel
        .findByIdAndUpdate(_id, updateQuery, { new: true })
        .lean();
    } catch (error) {
      console.log(`Unexpected error occured while updating Chain with ${_id}`);
      throw error;
    }
  }
  /**
   * Delete the Chain by Id
   * @param _id id of the Chain document
   * @returns Promise resolving to deleted Chain document or null if not found
   */
  async deleteChainById(_id: Types.ObjectId): Promise<Chain | null> {
    try {
      const deletedChain = await this.chainModel.findByIdAndDelete(_id).lean();
      return deletedChain;
    } catch (error) {
      console.log(`Unexpected error occured while deleting chain with ${_id}`);
      throw error;
    }
  }
  /**
   * update Chain document by chainId
   * @param chainId
   * @param updateQuery
   * @returns
   */
  async updateChain(chainId: number, updateQuery: UpdateQuery<ChainDocument>) {
    try {
      return await this.chainModel
        .findOneAndUpdate({ chainId }, updateQuery, { new: true })
        .lean();
    } catch (error) {
      console.log(
        `Unexpected error occured while updating Chain with ${chainId}`,
      );
      throw error;
    }
  }

  async updateChainStatus(_id: Types.ObjectId, status: ChainStatus) {
    const chain: Chain = await this.updateChainById(_id, { status });
    if (!chain)
      throw new NotFoundException(
        `${this.i18nService.t('chain.CHAIN_NOT_FOUND')} ${_id}`,
      );
    return chain;
  }
}
