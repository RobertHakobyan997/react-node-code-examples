import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ContactsFilter {
  @ApiProperty({
    description: 'field',
    example    : 'supplier'
  })
  @IsString()
    field: string;

  @ApiProperty({
    description: 'sortOrder',
    example    : 'asc'
  })
  @ApiProperty()
  @IsString()
    sortOrder: string;

  @ApiProperty({
    description: 'limit',
    example    : 10
  })
  @ApiProperty()
  @IsNumber()
    limit: number;

  @ApiProperty({
    description: 'offset',
    example    : 5
  })
  @ApiProperty()
  @IsNumber()
    offset: number;
}

