import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@core/utils/env/env.validator';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv })],
  controllers: [AppController],
})
export class AppModule {}
