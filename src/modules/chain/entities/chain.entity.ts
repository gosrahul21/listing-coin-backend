import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChainStatus } from '../../../types/chain-status.enum';

@Schema()
export class Chain {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    maxLength: 32,
    minLength: 3,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    unique: true,
  })
  chainId: number;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
    enum: ChainStatus,
    default: ChainStatus.PENDING,
  })
  status: ChainStatus;
}

export type ChainDocument = Chain & Document;

export const ChainSchema = SchemaFactory.createForClass(Chain);
