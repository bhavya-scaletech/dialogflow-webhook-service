import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repo';
import { Disease } from '../entities';
import { PGProviderToken } from '../connection';
import { DataSource } from 'typeorm';

@Injectable()
export class DiseaseRepository extends BaseRepository<Disease> {
  constructor(@Inject(PGProviderToken) dataSource: DataSource) {
    super(Disease, dataSource.createEntityManager());
  }
}
