// promotion-plan.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  bannerType: string;

  @IsNotEmpty()
  @IsString()
  bannerSize: string;
}
