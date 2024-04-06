import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateChainDto } from './dto/create-chain.dto';
import { PaginationOptionDto } from '../../common/dto/pagination-option.input';
import { Types } from 'mongoose';
import { ChainStatus } from '../../types/chain-status.enum';
import { I18nService } from 'nestjs-i18n';
import { ChainService } from './chain.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserRoles } from 'src/common/enum/userroles.enum';
import { AuthGuard } from 'src/guard/auth.guard';
import { UpdateChainDto } from './dto/update-chain.dto';

@Controller('chain')
export class ChainController {
  constructor(
    private readonly chainService: ChainService,
    private readonly i18nService: I18nService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async createChain(@Body() createChainInput: CreateChainDto) {
    console.log({ createChainInput });
    const chain = await this.chainService.createChain(createChainInput);
    return chain;
  }

  @Get('list')
  async listChain(@Body() option: PaginationOptionDto) {
    const chains = await this.chainService.getAllChains(option);
    return chains;
  }

  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  @Patch(':chainId')
  async updateChain(
    @Param('chainId') chainId: string,
    @Body() updateChainInput: UpdateChainDto,
  ) {
    const chain = await this.chainService.getChainById(
      new Types.ObjectId(chainId),
    );
    if (!chain)
      throw new NotFoundException(
        `${this.i18nService.t('chain.CHAIN_NOT_FOUND')} ${chainId}`,
      );
    // if (chain.status === ChainStatus.PENDING)
    //     throw new ForbiddenException(`${this.i18nService.t('chain.NOT_UPDATE_PENDING_CHAIN')}`);
    return await this.chainService.updateChainById(
      new Types.ObjectId(chainId),
      updateChainInput,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':chainId')
  async deletePendingChain(@Param('chainId') chainId: string) {
    let chain = await this.chainService.getChainById(
      new Types.ObjectId(chainId),
    );
    if (!chain)
      throw new NotFoundException(
        `${this.i18nService.t('chain.CHAIN_NOT_FOUND')} ${chainId}`,
      );
    if (chain.status !== ChainStatus.PENDING)
      throw new ForbiddenException(
        `${this.i18nService.t('chain.NOT_DELETE_NON_PENDING_CHAIN')}`,
      );
    chain = await this.chainService.deleteChainById(
      new Types.ObjectId(chainId),
    );
    if (!chain)
      throw new NotFoundException(
        `${this.i18nService.t('chain.CHAIN_NOT_FOUND')} ${chainId}`,
      );
    return chain;
  }
}
