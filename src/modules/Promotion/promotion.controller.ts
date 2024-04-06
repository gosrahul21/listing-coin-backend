// promotion-plan.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRoles } from 'src/common/enum/userroles.enum';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreatePromotionDto } from './dto/promotion.dto';
import { PromotionService } from './promotion.service';
import { Promotion } from './entities/promotion.entity';

@Controller('promotion-plans')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService, // private readonly orderService:
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createPromotionDto: CreatePromotionDto,
    @Req() req,
  ): Promise<Promotion> {
    const userId = req.decoded.userId;
    const promotion = await this.promotionService.create({
      ...createPromotionDto,
      userId,
    });
    // creat order & // add event

    return promotion;
  }

  @Get()
  async findAll(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  async remove(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.remove(id);
  }
}
