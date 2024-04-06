import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationOptionDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @IsPositive({
    message: 'Positive number is required',
  })
  @IsOptional()
  pageNo = 1;

  @IsInt()
  @IsPositive({
    message: 'Positive number is required',
  })
  @IsOptional()
  limit = 10;
}
