import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactRequest extends Contacts {
  @ApiProperty({
    description: 'filesMetadataIds',
    example    : [ '620d43c901c7e41a00e2046a' ]
  })
  @IsString({ each: true })
    filesMetadataIds: string[];
}
