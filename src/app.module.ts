import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@core/utils/env/env.validator';
import { DatabaseModule } from '@core/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv }), DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
