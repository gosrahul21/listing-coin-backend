// promotion.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PromotionPlan } from '../../promotion-plan/entities/promotion-plan.entity';
import { PromotionStatus } from 'src/common/enum/promotion-status.enum';

export type PromotionDocument = Promotion & Document;

@Schema({ timestamps: true })
export class Promotion {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: PromotionPlan.name })
  promotionPlan: PromotionPlan;

  @Prop({
    type: String,
  })
  userId: string;

  @Prop({ default: Date.now })
  startDate: Date;

  @Prop({
    default: PromotionStatus.PENDING,
    enum: PromotionStatus,
  })
  status: PromotionStatus;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
