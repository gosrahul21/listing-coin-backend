// promotion-plan.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PromotionPlanService } from '../services/promotion-plan.service';
import { CreatePromotionPlanDto } from '../dto/create-promotion-plan.dto';
import { PromotionPlan } from '../entities/promotion-plan.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserRoles } from 'src/common/enum/userroles.enum';

@Controller('promotion-plans')
export class PromotionPlanController {
  constructor(private readonly promotionPlanService: PromotionPlanService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async create(
    @Body() createPromotionPlanDto: CreatePromotionPlanDto,
  ): Promise<PromotionPlan> {
    return this.promotionPlanService.create(createPromotionPlanDto);
  }

  @Get()
  async findAll(): Promise<PromotionPlan[]> {
    return this.promotionPlanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PromotionPlan> {
    return this.promotionPlanService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updatePromotionPlanDto: CreatePromotionPlanDto,
  ): Promise<PromotionPlan> {
    return this.promotionPlanService.update(id, updatePromotionPlanDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async remove(@Param('id') id: string): Promise<PromotionPlan> {
    return this.promotionPlanService.remove(id);
  }
}
