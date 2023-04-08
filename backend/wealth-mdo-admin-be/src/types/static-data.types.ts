import { ApiProperty } from '@nestjs/swagger';

export interface StaticDataInterface {
  key: string;
  display: number;
  order: number;
}

export class StaticDataDto implements StaticDataInterface {
  @ApiProperty({
    description: 'Static data key',
    example: 'onTime'
 })
  key: string;
  @ApiProperty({
    description: 'Static data display name',
    example: 'On Time'
 })
  display: number;
  @ApiProperty({
    description: 'Display order',
    example: '1'
 })
  order: number;
}
