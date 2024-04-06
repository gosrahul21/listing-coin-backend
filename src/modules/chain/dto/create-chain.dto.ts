import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateChainDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  chainId: number;

  @IsString()
  @IsOptional()
  image: string;
}
