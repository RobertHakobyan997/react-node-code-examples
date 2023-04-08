import { Module } from '@nestjs/common';
import EntityTypesModel, { EntityTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/entity-types';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { EntityTypesController } from './entity-types.controller';
import { EntityTypesService } from './entity-types.service';
import { EntityTypesDal } from './entity-types.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ EntityTypesController ],
  providers  : [
    { provide: EntityTypesModelToken, useFactory: () => EntityTypesModel },
    EntityTypesService,
    EntityTypesDal
  ],
  exports: [ EntityTypesService ],
})
export class EntityTypesModule {
}
