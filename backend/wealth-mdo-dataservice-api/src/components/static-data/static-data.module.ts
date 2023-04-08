import { Module } from '@nestjs/common';

import { SuppliersModule } from '../suppliers/suppliers.module';
import { FileTypesModule } from '../file-types/file-types.module';
import { RegionsModule } from '../regions/regions.module';

import { StaticDataController } from './static-data.controller';
import { StaticDataService } from './static-data.service';

@Module({
  imports    : [ SuppliersModule, FileTypesModule, RegionsModule ],
  controllers: [ StaticDataController ],
  providers  : [ StaticDataService ],
  exports    : [ StaticDataService ],
})
export class StaticDataModule {}
