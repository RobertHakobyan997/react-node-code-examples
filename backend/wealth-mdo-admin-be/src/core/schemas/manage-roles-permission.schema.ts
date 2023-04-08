import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ManageRolesPermissionDocument = ManageRolesPermission & Document;

@Schema({ collection: 'manage-roles-permissions' })
export class ManageRolesPermission {
  @ApiProperty()
  @Prop()
  roles: string[];

  @ApiProperty()
  @Prop()
  permission: string;

  @ApiProperty()
  @Prop()
  disabledRolesForManage: string[];
}

export const ManageRolesPermissionSchema = SchemaFactory.createForClass(ManageRolesPermission);
