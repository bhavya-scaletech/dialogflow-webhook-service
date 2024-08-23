import { Body, Controller, Get, Headers, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicineFilter } from './dto/filter.req.dto';
import { protos } from '@google-cloud/dialogflow-cx';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get()
  async getMedicines(@Query() payload: MedicineFilter, @Headers() headers) {
    console.log('🚀 ~ MedicinesController ~ getMedicines ~ headers:', headers);
    console.log('🚀 ~ MedicinesController ~ getMedicines ~ payload:', payload);
    const data = await this.medicinesService.getMedicines(payload);
    return new protos.google.cloud.dialogflow.cx.v3.WebhookResponse({
      fulfillmentResponse: {
        messages: [{ text: { text: [JSON.stringify(data)] } }],
      },
    });
    return { text_resp: JSON.stringify(data), tag: 'text_resp' };
  }
}
