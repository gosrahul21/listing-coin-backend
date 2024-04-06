import { Module } from '@nestjs/common';
import { PromotionPlanController } from './controllers/promotion-plan.controller';
import { PromotionPlanService } from './services/promotion-plan.service';
import { PromotionCategoryService } from './services/promotion-category.service';
import { PromotionCategoryController } from './controllers/promotion-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PromotionPlan,
  PromotionPlanSchema,
} from './entities/promotion-plan.entity';
import {
  PromotionCategory,
  PromotionCategorySchema,
} from './entities/promotion-category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PromotionPlan.name,
        schema: PromotionPlanSchema,
      },
      {
        name: PromotionCategory.name,
        schema: PromotionCategorySchema,
      },
    ]),
    JwtModule,
  ],
  providers: [PromotionPlanService, PromotionCategoryService],
  controllers: [PromotionPlanController, PromotionCategoryController],
})
export class PromotionPlanModule {}
