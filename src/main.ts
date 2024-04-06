import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  I18nValidationExceptionFilter,
  i18nValidationErrorFactory,
} from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
      // whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
