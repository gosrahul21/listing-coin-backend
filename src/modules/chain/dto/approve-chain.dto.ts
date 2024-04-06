import { IsEnum, IsMongoId } from 'class-validator';
import { ChainStatus } from '../../../types/chain-status.enum';

export class ApproveChainDto {
  @IsMongoId()
  chainId: string;

  @IsEnum(ChainStatus)
  status: ChainStatus;
}
