import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PriceService } from './services/price.service';
import { PriceHistory, PriceHistorySchema } from './entities/price.entity';
import { PriceHistoryController } from './price.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
      {
        name: PriceHistory.name,
        schema: PriceHistorySchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [TokenController, PriceHistoryController],
  providers: [TokenService, PriceService],
})
export class TokenModule {}
