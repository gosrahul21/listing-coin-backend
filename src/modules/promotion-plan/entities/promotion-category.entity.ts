// promotion-Category.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PromotionCategoryDocument = PromotionCategory & Document;

@Schema()
export class PromotionCategory {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  bannerType: string; // Banner type, e.g., "Basic", "Premium"

  @Prop({ required: true })
  bannerSize: string; // Banner size, e.g., "600x240px", "1022x115px"

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PromotionCategorySchema =
  SchemaFactory.createForClass(PromotionCategory);
