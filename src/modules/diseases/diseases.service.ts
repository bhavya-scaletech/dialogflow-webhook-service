import { DiseaseRepository } from '@core/database/postgres/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiseasesService {
  constructor(private diseaseRepo: DiseaseRepository) {}
  async findAll() {
    return this.diseaseRepo.find();
  }
}
