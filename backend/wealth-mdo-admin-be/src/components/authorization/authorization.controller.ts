import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import {
  IAuthApp,
  IAuthData,
  IAuthGroup,
  IAuthGroupUser,
  IAuthPermission,
  IAuthRole,
  IAuthUser,
  IAuthUserCriteria,
} from '../../types/authorization.types';

import { AuthorizationService } from './authorization.service';
import { PermissionsMeta, PermissionsGuard } from './guards/permissions/permissions.guard';
import { User } from './decorators/user.decorator';
import { RoleLockGuard } from './guards/role-lock.guard';
import { CREATE_USER_PERMISSIONS } from './guards/permissions/permissions.const';

@Controller('authorization')
@ApiTags('authorization')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.manageUsersPage)
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {
  }

  @ApiOperation({ description: 'get user with roles' })
  @Get('get-user-with-roles')
  @PermissionsMeta()
  getUserWithRoles(@User('employeeId') employeeId: string): Observable<IAuthData> {
    return this.authorizationService.getUserWithPermissionsAndRoles(employeeId);
  }

  @ApiOperation({ description: 'get single user with roles' })
  @Get('get-user/:gpid')
  getUser(@Param('gpid') gpid: string): Observable<IAuthData> {
    return this.authorizationService.getUserWithRoles(gpid);
  }

  @ApiOperation({ description: 'get app info' })
  @Get('get-app')
  getApp(): Observable<IAuthApp> {
    return this.authorizationService.getApp();
  }

  @ApiOperation({ description: 'get app permissions' })
  @Get('get-permissions')
  getPermissions(): Observable<IAuthPermission[]> {
    return this.authorizationService.getPermissions();
  }

  @ApiOperation({ description: 'create permission' })
  @Post('create-permission')
  createPermission(
    @Query('permission') permission: string,
  ): Observable<IAuthPermission> {
    return this.authorizationService.createPermission(permission);
  }

  @ApiOperation({ description: 'get roles' })
  @Get('get-roles')
  getAppRoles(): Observable<IAuthRole[]> {
    return this.authorizationService.getRoles();
  }

  @ApiOperation({ description: 'create role' })
  @Post('create-role')
  createRole(@Body() role: IAuthRole): Observable<IAuthRole> {
    return this.authorizationService.createRole(role);
  }

  @ApiOperation({ description: 'get groups' })
  @Get('get-groups')
  getGroups(): Observable<IAuthGroup[]> {
    return this.authorizationService.getGroups();
  }

  @ApiOperation({ description: 'create group' })
  @Post('create-group')
  createGroup(@Body() group: IAuthGroup): Observable<IAuthPermission> {
    return this.authorizationService.createGroup(group);
  }

  @ApiOperation({ description: 'get users' })
  @Get('get-users')
  getUsers(@Body() criteria: IAuthUserCriteria): Observable<IAuthUser[]> {
    return this.authorizationService.getUser(criteria);
  }

  @ApiOperation({ description: 'create user' })
  @Post('create-user')
  @PermissionsMeta(...CREATE_USER_PERMISSIONS)
  createUser(@User() user: any, @Body() body: IAuthUser): Promise<IAuthUser> {
    logger.log(`Create user authorization data: ${JSON.stringify(body)}`);
    return this.authorizationService.createUser(user, body);
  }

  @ApiOperation({ description: 'update user' })
  @Put('update-user')
  @UseGuards(RoleLockGuard)
  @PermissionsMeta(Permissions.updateUser)
  updateUser(@User() user: any, @Body() body: IAuthUser): Promise<IAuthUser> {
    logger.log(`Update user authorization data: ${JSON.stringify(body)}`);
    return this.authorizationService.updateUser(user, body);
  }

  @ApiOperation({ description: 'delete user' })
  @Delete('delete-user')
  @UseGuards(RoleLockGuard)
  @PermissionsMeta(Permissions.deleteUser)
  deleteUser(@User() user: any, @Query('id') id: string): Promise<IAuthUser> {
    logger.log(`Delete user authorization data: ${id}`);
    return this.authorizationService.deleteUser(user, id);
  }

  @ApiOperation({ description: 'activate user' })
  @Put('activate-user')
  @UseGuards(RoleLockGuard)
  @PermissionsMeta(Permissions.activateAccount)
  activateUser(@User() user: any, @Body() body: IAuthUser): Promise<IAuthUser> {
    logger.log(`Activate user: ${body._id}`);
    return this.authorizationService.activateUser(user, body);
  }

  @ApiOperation({ description: 'suspend user' })
  @Put('suspend-user')
  @UseGuards(RoleLockGuard)
  @PermissionsMeta(Permissions.suspendAccount)
  suspendUser(@User() user: any,  @Body() body: IAuthUser): Promise<IAuthUser> {
    logger.log(`Suspend user: ${body._id}`);
    return this.authorizationService.activateUser(user, body, false);
  }

  @ApiOperation({ description: 'assign roles to group' })
  @Post('assign-group-roles')
  assignGroupRoles(
    @Body() groupsRoles: Record<string, string[]>,
  ): Observable<any> {
    return this.authorizationService.assignGroupsRoles(groupsRoles);
  }

  @ApiOperation({ description: 'assign group to user' })
  @Post('assign-user-group')
  assignUserGroup(
    @Query('groupId') groupId: string,
    @Query('globalProfileId') globalProfileId: string,
  ): Observable<IAuthGroupUser> {
    return this.authorizationService.addGroupUser(groupId, globalProfileId);
  }

  @ApiOperation({ description: 'get all users with roles' })
  @Get('get-users-with-roles')
  getAppUsersWithRoles(): Observable<IAuthData> {
    return this.authorizationService.getUsersWithRoles();
  }

  @ApiOperation({ description: 'get all users with filter by roles' })
  @Get('get-filtered-users-with-roles')
  getAppFilteredUsersWithRoles(
    @Query('roleId') roleId: string,
    @Query('status') status: string,
    @Query('queryString') queryString: string,
  ): Observable<IAuthData[]> {
    return this.authorizationService.getUsersWithRolesFiltered(roleId, status, queryString);
  }
}
