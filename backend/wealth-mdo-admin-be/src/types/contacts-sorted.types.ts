import { ApiProperty } from '@nestjs/swagger';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

export class ContactsSortedRequest {
  @ApiProperty({
    description: 'Sort field',
    example: 'supplier'
  })
  field: string;
  @ApiProperty({
    description: 'Sort order',
    example: 'asc'
  })
  sortOrder: string;
  @ApiProperty({
    description: 'Page limit',
    example: 50
  })
  limit: number;
  @ApiProperty({
    description: 'Page offset',
    example: 0
  })
  offset: number;
}

export class ContactsResponse {
  @ApiProperty({
    description: 'Current page',
    example: 0
  })
  page: number;
  @ApiProperty({
    description: 'Total pages',
    example: 2
  })
  pages: number;
  @ApiProperty({
    description: 'Total docs',
    example: 100
  })
  totalDocs: number;
  @ApiProperty({
    description: 'Contacts',
    type: [ Contacts ]
  })
  docs: Contacts[];
}
