import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { ReadOnlyGuard } from '../../core/guards/read-only.guard';
import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { ManageRolesPermissionsService } from './manage-roles-permissions.service';
import { ManageRolesPermissionData, ManageRolesPermissionUpdateRequest } from './types/ManageRolesPermission.type';

@Controller('manage-roles-permissions')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.configurePermissions)
export class ManageRolesPermissionsController {
  constructor(private readonly manageRolesPermissionsService: ManageRolesPermissionsService) {}

  @ApiOperation({
    description: 'Get all manage roles-permissions data',
  })
  @Get()
  getAll() {
    return this.manageRolesPermissionsService.findAll();
  }

  @ApiOperation({
    description: 'Create new manageable roles-permission structure',
  })
  @Post()
  create(@Body() body: ManageRolesPermissionData) {
    return this.manageRolesPermissionsService.create(body);
  }

  @ApiOperation({
    description: 'Remove roles-permission structure by id',
  })
  @Delete()
  delete(@Param() id: string) {
    return this.manageRolesPermissionsService.delete(id);
  }

  @ApiOperation({
    description: 'Update specific permissions for the list of roles',
  })
  @Put()
  @UseGuards(ReadOnlyGuard)
  update(@Body() body: ManageRolesPermissionUpdateRequest[]) {
    return this.manageRolesPermissionsService.update(body);
  }
}

