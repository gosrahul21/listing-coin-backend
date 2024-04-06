import { ChainController } from './chain.controller';
import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chain, ChainSchema } from './entities/chain.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chain.name,
        schema: ChainSchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [ChainController],
  providers: [ChainService],
})
export class ChainModule {}
