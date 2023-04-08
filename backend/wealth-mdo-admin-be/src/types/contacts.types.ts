import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

export class CreateContact extends OmitType(Contacts, [ '_id' ] as const) {
  @ApiProperty({
    description: 'File metadata IDs',
    example: [ '62136455dfe96a8d2c92414a', '62136455dfe96a8d2c92414b' ]
 })
  filesMetadataIds: string[];
}

export class UpdateContactRequest extends PartialType<Contacts>(Contacts) {
  @ApiProperty({
    description: 'File metadata IDs',
    example: [ '62136455dfe96a8d2c92414a', '62136455dfe96a8d2c92414b' ]
 })
   filesMetadataIds: string[];
}
