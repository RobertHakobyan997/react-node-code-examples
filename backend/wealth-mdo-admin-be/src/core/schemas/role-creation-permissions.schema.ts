import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RoleCreationPermissionsDocument = RoleCreationPermissions & Document;

@Schema({ collection: 'role-creation-permissions' })
export class RoleCreationPermissions {
  @ApiProperty()
  @Prop()
  permission: string;

  @ApiProperty()
  @Prop()
  role: string;
}

export const RoleCreationPermissionsSchema = SchemaFactory.createForClass(RoleCreationPermissions);
