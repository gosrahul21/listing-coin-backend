import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsUrl,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(10)
  symbol: string;

  @IsString()
  @IsNotEmpty()
  chainId: string;

  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  telegram?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsNumberString()
  marketCap: number;

  // @IsNumber()
  // tradingVolume24h: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  algorithm: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  consensusMechanism: string;

  @IsNumberString()
  maxSupply: number;

  @IsOptional()
  // @IsUrl()
  @IsString()
  githubRepo?: string;

  @IsOptional()
  @IsString()
  roadmap?: string;

  @IsOptional()
  @IsString({ each: true })
  exchanges?: string[];

  @IsOptional()
  @IsString({ each: true })
  tradingPairs?: string[];

  @IsNumber()
  circulatingSupply: number;

  @IsNumber()
  totalSupply: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  whitepaperUrl?: string;
}
