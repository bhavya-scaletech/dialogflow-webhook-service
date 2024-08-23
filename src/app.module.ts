import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@core/utils/env/env.validator';
import { DatabaseModule } from '@core/database/database.module';
import { DiseasesModule } from './modules/diseases/diseases.module';
import { MedicinesModule } from './modules/medicines/medicines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    DatabaseModule,
    DiseasesModule,
    MedicinesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
