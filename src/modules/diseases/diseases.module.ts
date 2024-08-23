import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesController } from './diseases.controller';

@Module({
  imports: [],
  controllers: [DiseasesController],
  providers: [DiseasesService],
})
export class DiseasesModule {}
