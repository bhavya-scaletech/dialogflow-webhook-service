import { Controller, Get } from '@nestjs/common';
import { DiseasesService } from './diseases.service';

@Controller('diseases')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  async findAll() {
    return { data: await this.diseasesService.findAll() };
  }
}
