import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@core/utils/env/env.validator';
import { DatabaseModule } from '@core/database/database.module';

import { MedicinesModule } from './modules/search/search.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    DatabaseModule,
    MedicinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
