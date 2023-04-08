import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PagesPermissionsDocument = PagesPermissions & Document;

@Schema({ collection: 'pages-permissions' })
export class PagesPermissions {
  @ApiProperty()
  @Prop()
  permission: string;

  @ApiProperty()
  @Prop()
  route: string;

  @ApiProperty()
  @Prop()
  actionPermissions: string[];
}

export const PagesPermissionsSchema = SchemaFactory.createForClass(PagesPermissions);
