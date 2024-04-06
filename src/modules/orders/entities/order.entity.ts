// order.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PromotionPlan } from '../../promotion-plan/entities/promotion-plan.entity';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: PromotionPlan.name })
  promotion: PromotionPlan;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
