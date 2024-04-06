// promotion-category.controller.ts

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
import { PromotionCategoryService } from '../services/promotion-category.service';
import { PromotionCategory } from '../entities/promotion-category.entity';
import { CreatePromotionCategoryDto } from '../dto/create-promotion-categorydto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserRoles } from 'src/common/enum/userroles.enum';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('promotion-categories')
export class PromotionCategoryController {
  constructor(
    private readonly promotionCategoryService: PromotionCategoryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async create(
    @Body() createPromotionCategoryDto: CreatePromotionCategoryDto,
  ): Promise<PromotionCategory> {
    return this.promotionCategoryService.create(createPromotionCategoryDto);
  }

  @Get()
  async findAll(): Promise<PromotionCategory[]> {
    return this.promotionCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PromotionCategory> {
    return this.promotionCategoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updatePromotionCategoryDto: CreatePromotionCategoryDto,
  ): Promise<PromotionCategory> {
    return this.promotionCategoryService.update(id, updatePromotionCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async remove(@Param('id') id: string): Promise<PromotionCategory> {
    return this.promotionCategoryService.remove(id);
  }
}
