import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePromotionPlanDto {
  @IsNotEmpty()
  @IsMongoId()
  promotionCategory: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  price: string;
}
