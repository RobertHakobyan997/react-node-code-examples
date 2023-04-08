import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ManageRolesPermissionData {
  @IsNotEmpty()
  @IsString()
  permission: string;

  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  disabledRolesForManage: string[];
}

export type ManageRolesPermissionUpdateRequest = Partial<ManageRolesPermissionData>;
