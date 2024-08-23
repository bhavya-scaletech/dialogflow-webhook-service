import { MedicineRepository } from '@core/database/postgres/repositories';
import { Injectable } from '@nestjs/common';
import { MedicineFilter } from './dto/filter.req.dto';
import { ILike } from 'typeorm';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicinesRepo: MedicineRepository) {}
  getMedicines(payload: MedicineFilter) {
    return this.medicinesRepo.find({
      relations: { disease: true },
      select: {
        name: true,
        dosage: true,
        frequency: true,
        available_quantity: true,
        rate_per_unit: true,
        quantity_per_unit: true,
        disease: { name: true },
      },
      where: [
        {
          ...(payload.search_string && {
            disease: { name: ILike(`%${payload.search_string}%`) },
          }),
        },
        {
          ...(payload.search_string && {
            name: ILike(`%${payload.search_string}%`),
          }),
        },
      ],
    });
  }
}
