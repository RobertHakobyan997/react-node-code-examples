import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { DataAccessAuthGuard } from '../../core/guards/data-access.guard';
import { ReadOnlyGuard } from '../../core/guards/read-only.guard';

import { RoleCreationPermissionsService } from './role-creation-permissions.service';
import { RoleCreationPermission } from './types/RoleCreationPermission.type';

@Controller('role-creation-permissions')
@UseGuards(DataAccessAuthGuard)
export class RoleCreationPermissionsController {
  constructor(private readonly roleCreationPermissionService: RoleCreationPermissionsService) {}

  @ApiOperation({
    description: 'Turn off role creation',
  })
  @Delete()
  @UseGuards(ReadOnlyGuard)
  delete(@Body() body: RoleCreationPermission) {
    return this.roleCreationPermissionService.delete(body);
  }
}

