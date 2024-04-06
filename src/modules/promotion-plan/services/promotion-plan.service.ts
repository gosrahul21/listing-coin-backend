// promotion-plan.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromotionPlanDto } from '../dto/create-promotion-plan.dto';
import {
  PromotionPlan,
  PromotionPlanDocument,
} from '../entities/promotion-plan.entity';

@Injectable()
export class PromotionPlanService {
  constructor(
    @InjectModel(PromotionPlan.name)
    private promotionPlanModel: Model<PromotionPlanDocument>,
  ) {}

  async create(
    createPromotionPlanDto: CreatePromotionPlanDto,
  ): Promise<PromotionPlan> {
    const createdPromotionPlan = new this.promotionPlanModel(
      createPromotionPlanDto,
    );
    return createdPromotionPlan.save();
  }

  async findAll(): Promise<PromotionPlan[]> {
    return this.promotionPlanModel.find().exec();
  }

  async findOne(id: string): Promise<PromotionPlan> {
    return this.promotionPlanModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePromotionPlanDto: CreatePromotionPlanDto,
  ): Promise<PromotionPlan> {
    return this.promotionPlanModel.findByIdAndUpdate(
      id,
      updatePromotionPlanDto,
      { new: true },
    );
  }

  async remove(id: string): Promise<PromotionPlan> {
    return this.promotionPlanModel.findByIdAndDelete(id);
  }
}
