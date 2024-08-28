import { Module } from '@nestjs/common';
import { MedicinesService } from './search.service';
import { MedicinesController } from './search.controller';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService]
})
export class MedicinesModule {}
