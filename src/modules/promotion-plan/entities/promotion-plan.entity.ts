import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PromotionCategory } from './promotion-category.entity';

@Schema({
  timestamps: true,
})
export class PromotionPlan {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  promotionCategory: Types.ObjectId | PromotionCategory;

  @Prop({
    required: true,
  })
  duration: string;

  @Prop({
    required: true,
  })
  price: string;
}

export const PromotionPlanSchema = SchemaFactory.createForClass(PromotionPlan);

export type PromotionPlanDocument = PromotionPlan & Document;
