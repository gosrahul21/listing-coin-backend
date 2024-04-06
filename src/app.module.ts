import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChainModule } from './modules/chain/chain.module';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getMongoUrl } from './common/utils/getMongoUrl';
import { PromotionPlanModule } from './modules/promotion-plan/promotion-plan.module';
import { TokenModule } from './modules/token/token.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static/';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoUrl()),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/translation/'),
        watch: true,
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_PRIVATE_KEY,
      signOptions: { expiresIn: process.env.EXPIRE_TIME },
    }),
    ChainModule,
    PromotionPlanModule,
    TokenModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'upload'),
      serveRoot: '/api/public/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
