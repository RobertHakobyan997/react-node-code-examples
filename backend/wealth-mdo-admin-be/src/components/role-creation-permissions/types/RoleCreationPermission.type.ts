import { IsNotEmpty, IsString } from 'class-validator';

export class RoleCreationPermission {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  permission: string;
}
