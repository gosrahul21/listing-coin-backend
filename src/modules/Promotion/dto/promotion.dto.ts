// create-promotion.dto.ts

import { IsNotEmpty, IsDate, IsEnum, IsMongoId } from 'class-validator';
import { PromotionStatus } from 'src/common/enum/promotion-status.enum';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsMongoId()
  promotionPlan: string;

  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(PromotionStatus)
  status: PromotionStatus;
}
