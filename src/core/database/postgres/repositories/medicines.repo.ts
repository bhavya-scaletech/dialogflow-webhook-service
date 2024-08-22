import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repo';
import { Medicines } from '../entities';
import { PGProviderToken } from '../connection';
import { DataSource } from 'typeorm';

@Injectable()
export class MedicineRepository extends BaseRepository<Medicines> {
  constructor(@Inject(PGProviderToken) dataSource: DataSource) {
    super(Medicines, dataSource.createEntityManager());
  }
}
