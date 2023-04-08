import { Module } from '@nestjs/common';
import FileTypesModel, { FileTypesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-types';

import { DatabaseModule } from '../../core/database/mongodb/database.module';

import { FileTypesController } from './file-types.controller';
import { FileTypesService } from './file-types.service';
import { FileTypesDal } from './file-types.dal';

@Module({
  imports    : [ DatabaseModule ],
  controllers: [ FileTypesController ],
  providers  : [
    { provide: FileTypesModelToken, useFactory: () => FileTypesModel },
    FileTypesService,
    FileTypesDal
  ],
  exports: [ FileTypesService ],
})
export class FileTypesModule {
}
