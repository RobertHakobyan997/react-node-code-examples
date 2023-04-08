import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { LastChangesUsersService } from './last-changes-users.service';

@Controller('last-changes-users')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.manageUsersPage)
export class LastChangesUsersController {
  constructor(private readonly lastChangesUserService: LastChangesUsersService) {}

  @ApiOperation({ description: 'get all users with last changes' })
  @Get()
  getAppUsersWithRolesAndLastChanges() {
    return this.lastChangesUserService.getUsersWithRolesAndBaseEvents();
  }
}
