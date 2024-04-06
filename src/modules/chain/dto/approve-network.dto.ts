import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { NetworkStatus } from '../../../types/network.-status.enum';

export class ApproveNetworkDto {
  @IsMongoId()
  networkId: string;

  @IsString()
  @IsNotEmpty()
  vaultId: string;

  @IsEnum(NetworkStatus)
  status: NetworkStatus;
}
