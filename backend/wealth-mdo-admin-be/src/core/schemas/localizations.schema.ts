import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LocalizationDocument = Localization & Document;

@Schema({ collection: 'localizations' })
export class Localization {
  @ApiProperty()
  @Prop()
  language: string;

  @ApiProperty({ type: MongooseSchema.Types.Mixed })
  @Prop()
  localization: MongooseSchema.Types.Mixed;
}

export const LocalizationSchema = SchemaFactory.createForClass(Localization);
