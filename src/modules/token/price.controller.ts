import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './services/price.service';
import { Types } from 'mongoose';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceService) {}

  @Get(':tokenId')
  async getCurrentPriceAndHistory(@Param('tokenId') tokenId: string) {
    try {
      const currentPriceAndHistory =
        await this.priceHistoryService.getCurrentPrice(
          new Types.ObjectId(tokenId),
        );
      return currentPriceAndHistory;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error fetching current price and history:', error);
      throw new Error('Failed to fetch current price and history');
    }
  }

  @Get('/series/:tokenId')
  async getPriceSeries(@Param('tokenId') tokenId: string) {
    try {
      const priceSeries = await this.priceHistoryService.getPriceSeries(
        new Types.ObjectId(tokenId),
      );
      return priceSeries;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error fetching current price and history:', error);
      throw new Error('Failed to fetch current price and history');
    }
  }
}
