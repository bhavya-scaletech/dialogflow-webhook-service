import { MedicineRepository } from '@core/database/postgres/repositories';
import { Injectable } from '@nestjs/common';
import { MedicineFilter } from './dto/filter.req.dto';
import { ILike } from 'typeorm';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicinesRepo: MedicineRepository) {}
  async getMedicines(payload: any) {
    const response = {
      fulfillmentMessages: [],
    };
    const action = payload.queryResult?.action;
    if (!action) {
      response.fulfillmentMessages = [
        {
          text: { text: ['Action not matching.'] },
        },
      ];

      return response;
    } else if (action == 'search') {
      const search_string = payload.queryResult.parameters.MedicineName;
      if (!search_string) {
        response.fulfillmentMessages = [
          {
            text: { text: ['Search cant be empty.'] },
          },
        ];

        return response;
      }
      const result = await this.medicinesRepo.find({
        select: {
          name: true,
          dosage: true,
          frequency: true,
          available_quantity: true,
          rate_per_unit: true,
          quantity_per_unit: true,
        },
        where: {
          name: ILike(`%${search_string}%`),
        },
      });
      if (!result.length) {
        response.fulfillmentMessages = [
          {
            text: { text: [`Medicine ${search_string} not found`] },
          },
        ];

        return response;
      }
      const responseMessages = result.map(
        (i) =>
          ` name:${i.name} \ndosage:${i.dosage} \nfrequency:${i.frequency} \navailable_quantity:${i.available_quantity} \nrate_per_unit:${i.rate_per_unit} \nquantity_per_unit:${i.quantity_per_unit}`,
      );
      response.fulfillmentMessages = [{ text: { text: responseMessages } }];
    }
    return response;
  }
}
