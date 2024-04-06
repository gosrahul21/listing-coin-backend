import { Types } from 'mongoose';
import { Token } from './token.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PriceHistory {
  _id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Token.name,
    unique: true,
  })
  token: Types.ObjectId | Token;

  @Prop({
    default: [],
  })
  priceHistory: {
    time: number;
    value: number;
  }[]; // every 1 min price chart

  @Prop({
    type: Number,
  })
  currentPriceInUsd: number;
}

export type PriceHistoryDocument = PriceHistory & Document;
export const PriceHistorySchema = SchemaFactory.createForClass(PriceHistory);
