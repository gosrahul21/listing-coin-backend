// token.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import event from './event';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>, // private eventEmitter: EventEmitter2
  ) {}

  async create(token: CreateTokenDto & { userId: string }): Promise<Token> {
    const createdToken = (await this.tokenModel.create(token)).toObject();
    // this.eventEmitter.emit('token.created', createdToken );
    // add token to tokenList
    event.emit('token.created', createdToken);
    return createdToken;
  }

  async findAll(): Promise<Token[]> {
    return this.tokenModel.find().populate('chainId').exec();
  }

  async findById(id: string): Promise<Token> {
    return this.tokenModel.findById(id).exec();
  }

  async update(id: string, token: UpdateTokenDto): Promise<Token> {
    return this.tokenModel.findByIdAndUpdate(id, token, { new: true });
  }

  async delete(id: string): Promise<Token> {
    return this.tokenModel.findByIdAndDelete(id);
  }
}
