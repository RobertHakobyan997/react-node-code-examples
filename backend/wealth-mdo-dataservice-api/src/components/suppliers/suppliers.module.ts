import { Module } from '@nestjs/common';
import SuppliersModel, { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { SuppliersDal } from './suppliers.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ SuppliersController ],
  providers  : [
    { provide: SuppliersModelToken, useFactory: () => SuppliersModel },
    SuppliersService,
    SuppliersDal
  ],
  exports: [ SuppliersService ],
})
export class SuppliersModule {
}
