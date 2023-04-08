import { PartialType } from '@nestjs/mapped-types';
import { Allow, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

export class PartialContact extends PartialType<Contacts>(Contacts) {
}

export class UpdateContactRequest {
  @ApiProperty({
    description: 'contact',
    example    : {
      supplier: 'jpMorgan',
      company : 'JP Morgan & Co.',
      email   : 'pbservice.ukme@jpmorgan.com',
      name    : 'Zuzanna Korsak',
      number  : '+353 1 786 4011'
    }
  })
  @Allow()
    contact: PartialContact;

  @ApiProperty({
    description: 'filesMetadataIds',
    example    : [ '620d43c901c7e41a00e2046a' ]
  })
  @IsString({ each: true })
    filesMetadataIds: string[];
}
