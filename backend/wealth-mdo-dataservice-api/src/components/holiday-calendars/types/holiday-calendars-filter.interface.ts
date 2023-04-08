import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class HolidayCalendarsFilter {
  @ApiProperty({
    description: 'field',
    example    : 'region',
    type       : String,
  })
  @IsString()
    field: string;

  @ApiProperty({
    description: 'sortOrder',
    example    : 'asc',
    type       : String,
  })
  @IsString()
    sortOrder: string;

  @ApiProperty({
    description: 'limit',
    example    : '50',
    type       : Number,
  })
  @IsNumber()
    limit: number;

  @ApiProperty({
    description: 'offset',
    example    : '1',
    type       : Number,
  })
  @IsNumber()
    offset: number;
}
