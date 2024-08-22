import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, VersioningType } from '@nestjs/common';
import {
  GlobalExceptionFilter,
  TransformInterceptor,
  ValidationPipe,
} from '@core/utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swagger } from '@core/utils/swagger';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.use(compression());
  app.enableCors();
  app.set('trust proxy', true);
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  swagger(app);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
