// promotion-category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PromotionCategory,
  PromotionCategoryDocument,
} from '../entities/promotion-category.entity';
import { CreatePromotionCategoryDto } from '../dto/create-promotion-categorydto';

@Injectable()
export class PromotionCategoryService {
  constructor(
    @InjectModel(PromotionCategory.name)
    private promotionCategoryModel: Model<PromotionCategoryDocument>,
  ) {}

  async create(
    createPromotionCategoryDto: CreatePromotionCategoryDto,
  ): Promise<PromotionCategory> {
    const createdPromotionCategory = new this.promotionCategoryModel(
      createPromotionCategoryDto,
    );
    return createdPromotionCategory.save();
  }

  async findAll(): Promise<PromotionCategory[]> {
    return this.promotionCategoryModel.find().exec();
  }

  async findOne(id: string): Promise<PromotionCategory> {
    return this.promotionCategoryModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePromotionCategoryDto: CreatePromotionCategoryDto,
  ): Promise<PromotionCategory> {
    return this.promotionCategoryModel.findByIdAndUpdate(
      id,
      updatePromotionCategoryDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<PromotionCategory> {
    return this.promotionCategoryModel.findByIdAndDelete(id);
  }
}
