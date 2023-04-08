import { Module } from '@nestjs/common';
import ContactsModel, { ContactsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/contacts';

import { DatabaseModule } from '../../core/database/mongodb/database.module';
import { FilesMetadataModule } from '../files-metadata/files-metadata.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

import { ContactsController } from './contacts.controller';
import { ContactsDal } from './contacts.dal';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    DatabaseModule,
    FilesMetadataModule,
    SuppliersModule
  ],
  controllers: [ ContactsController ],
  providers  : [
    { provide: ContactsModelToken, useFactory: () => ContactsModel },
    ContactsService,
    ContactsDal
  ],
  exports: [ ContactsService ],
})
export class ContactsModule {}
