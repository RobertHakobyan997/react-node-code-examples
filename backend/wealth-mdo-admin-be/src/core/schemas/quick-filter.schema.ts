import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type QuickFilterDocument = QuickFilter & Document;

@Schema({ collection: 'quick-filters' })
export class QuickFilter {
  @ApiProperty()
  @Prop()
  key: string;

  @ApiProperty()
  @Prop()
  display: string;

  @ApiProperty()
  @Prop()
  units: string;

  @ApiProperty()
  @Prop()
  order: number;

  @ApiProperty()
  @Prop()
  count: number;
}

export const QuickFilterSchema = SchemaFactory.createForClass(QuickFilter);
