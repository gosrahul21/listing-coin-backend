// Token.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chain } from 'src/modules/chain/entities/chain.entity';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  _id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, required: true, ref: Chain.name })
  chainId: Types.ObjectId;

  @Prop({ required: true })
  tokenAddress: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: false })
  telegram?: string;

  @Prop({ required: false })
  instagram?: string;

  @Prop()
  logoUrl: string;

  //   @Prop({ required: true })
  //   createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  launchDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  votes: number;

  // Additional Details
  @Prop({ required: false })
  currentPrice: number;

  @Prop({ required: true })
  marketCap: number;

  @Prop({ required: false })
  tradingVolume24h: number;

  @Prop({ required: false })
  algorithm: string;

  @Prop({ required: false })
  consensusMechanism: string;

  @Prop({ required: false })
  maxSupply: number;

  @Prop()
  githubRepo: string;

  @Prop()
  communityChannels: string[];

  @Prop()
  roadmap: string;

  @Prop({ required: false })
  priceChange24h: number;

  @Prop()
  exchanges: string[];

  @Prop()
  tradingPairs: string[];

  @Prop({ required: false })
  circulatingSupply: number;

  @Prop({ required: false })
  totalSupply: number;

  @Prop({ required: false })
  tokenType: string;

  @Prop({
    type: String,
  })
  whitepaperUrl: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
