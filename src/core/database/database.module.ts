import { Module, Provider } from '@nestjs/common';
import { DiseaseRepository, MedicineRepository } from './postgres/repositories';
import { PGDataSource, PGProviderToken } from './postgres/connection';

const postgresProviders: Provider[] = [MedicineRepository, DiseaseRepository];

@Module({
  providers: [
    {
      provide: PGProviderToken,
      useFactory: async () => {
        return await PGDataSource.initialize();
      },
    },
    ...postgresProviders,
  ],
  exports: [...postgresProviders],
})
export class DatabaseModule {}
