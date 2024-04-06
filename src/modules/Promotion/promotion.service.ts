// promotion-plan.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromotionDto } from './dto/promotion.dto';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name) private promotionModel: Model<Promotion>,
  ) {}

  async create(
    createPromotionDto: CreatePromotionDto & { userId },
  ): Promise<Promotion> {
    const createdPromotion = (
      await this.promotionModel.create(createPromotionDto)
    ).populate('promotionPlan.promotionCategory');
    return createdPromotion;
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec();
  }

  async findOne(id: string): Promise<Promotion> {
    return this.promotionModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Promotion> {
    return this.promotionModel.findByIdAndDelete(id);
  }
}
