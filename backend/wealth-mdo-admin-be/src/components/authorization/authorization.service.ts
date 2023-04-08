import { ConflictException, ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { from, Observable, zip } from 'rxjs';
import { filter, map, switchMap, toArray } from 'rxjs/operators';
import { JwtUser } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/authorization.type';
import { chain, intersection, isEmpty } from 'lodash';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SiemEvent } from 'ngpd-merceros-logger-be';

import { EVENT_TYPE } from '../../constants/events.const';
import { EventParams } from '../../types/events.types';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserService } from '../user/user.service';
import {
  AvailableRoleToManagePermissions,
  IAuthApp,
  IAuthData,
  IAuthGroup,
  IAuthGroupUser,
  IAuthPermission,
  IAuthRole,
  IAuthUser,
  IAuthUserCriteria,
  UserData,
} from '../../types/authorization.types';
import { ManageRolesPermissionsService } from '../manage-roles-permissions/manage-roles-permissions.service';
import { ManageRolesPermissionData } from '../manage-roles-permissions/types/ManageRolesPermission.type';

import { AuthorizationClientService } from './authorization-client.service';

@Injectable()
export class AuthorizationService {
  private authApp: Observable<IAuthApp>;
  private readonly entityName = 'user';

  constructor(
    private readonly authClientApi: AuthorizationClientService,
    private readonly eventEmitter: EventEmitter2,
    private readonly userSettingsService: UserSettingsService,
    private readonly userService: UserService,
    private readonly manageRolesPermissionsService: ManageRolesPermissionsService
  ) {
  }

  getUserWithRoles(gpid): Observable<IAuthData> {
    return this.authClientApi.getUserWithRoles(gpid);
  }

  getUserWithPermissionsAndRoles(gpid): Observable<UserData> {
    return zip(
      this.authClientApi.getUserWithRoles(gpid),
      this.userSettingsService.getPagesPermissions(),
      this.userSettingsService.getRoleCreationPermissions(),
      this.getRoles(),
      this.manageRolesPermissionsService.findAll({}, {}, { lean: true }),
      this.getPermissions()
    ).pipe(
      map(([ { user, roles }, pagesPermission, permissionRole, appRoles, disabledPermissionsForRoles, permissions ]) => {
        const initialUserPermissions = chain(roles)
          .map(role => role.permissions)
          .reduce((all, current) => all.concat(current))
          .uniq()
          .value();

        const rolesName = roles.map(role => role.name);
        const permissionsToDisable = disabledPermissionsForRoles
          .filter(item => !isEmpty(intersection(item.roles, rolesName)) && initialUserPermissions.includes(item.permission))
          .map(item => item.permission);
        const userPermissions = initialUserPermissions.filter(permission => !permissionsToDisable.includes(permission));

        if (isEmpty(userPermissions) || !user || !user.activated)
          throw new ForbiddenException({
            // eslint-disable-next-line max-len
            message     : `The email address entered was not found or has not yet been granted permissions to access this site. Please contact your account administrator.`,
            shouldLogout: true,
            statusCode  : HttpStatus.FORBIDDEN,
          });

        const accessiblePages = chain(pagesPermission)
          .filter(page => userPermissions.includes(page.permission))
          .map(page => ({
            route            : page.route,
            permission       : page.permission,
            actionPermissions: intersection(page.actionPermissions, userPermissions),
          }))
          .value();

        const availableRolesToSet = chain(permissionRole)
          .filter(({ permission, role }) => userPermissions.includes(permission)
            && appRoles.some(appRole => appRole.name === role))
          .map(({ role }) => appRoles.find(appRole => appRole.name === role))
          .map(appRole => ({
            _id : appRole._id,
            name: appRole.name,
          }))
          .value();

        const availableRolesToManagePermissions = this.mapAvailableManageRolesPermissions(
          appRoles, disabledPermissionsForRoles, permissions);

        return { user, roles, accessiblePages, availableRolesToSet, availableRolesToManagePermissions };
      }),
    );
  }

  getUser(criteria: Partial<IAuthUserCriteria>): Observable<IAuthUser[]> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.getUser({ ...criteria, appId: app._id })),
      );
  }

  async createEvent({ jwtUser, topic, oldValue, newValue, entityName=this.entityName }: EventParams<IAuthUser>, siem: SiemEvent | string) {
    const user = await this.authClientApi.getUserWithRoles(jwtUser.employeeId).toPromise();
    return this.eventEmitter.emit(
      'createEvent',
      {
        context: AuthorizationService.name,
        siem,
        entityName,
        data   : {
          topic,
          user,
          data: {
            oldValue,
            newValue,
          },
        },
        userId : jwtUser.employeeId,
      },
    );
  }

  async hasUniqueGlobalProfileId(gpid: string | number): Promise<IAuthData[]> {
    return this.getUsersWithRoles().pipe(
      toArray(),
      filter(users => users.some(({ user }) => user.globalProfileId === gpid)),
      map(() => {
        throw new ConflictException('A user account with this Employee ID already exists. Please check and try again.');
      }),
    ).toPromise();
  }

  async createUser(jwtUser: JwtUser, body: IAuthUser): Promise<IAuthUser> {
    try {
      await this.hasUniqueGlobalProfileId(body.globalProfileId);
      const { _id: appId } = await this.getApp().toPromise();
      const user = this.authClientApi.createUser({ ...body, appId }).toPromise();
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.created, newValue: { user: body } }, SiemEvent.UserCreated);
      return user;
    } catch (error) {
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.error, newValue: error.message }, EVENT_TYPE.error);
      if (error instanceof ConflictException)
        throw new ConflictException(error.message);
       else
        throw new InternalServerErrorException(error);

    }
  }

  async updateUser(jwtUser: JwtUser, body: IAuthUser): Promise<IAuthUser> {
    try {
      const oldValue = await this.authClientApi.getUserWithRoles(body.globalProfileId).toPromise();
      const updated = await this.authClientApi.updateUser(body).toPromise();
      // Update user in mdoadmin DB
      await this.userService.updateUser(String(body.globalProfileId), {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.email,
        role: body.roles[0]
      });
      const newValue = await this.authClientApi.getUserWithRoles(updated.globalProfileId).toPromise();
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.modified, oldValue, newValue, }, SiemEvent.UserAltered);
      return updated;
    } catch (error) {
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.error, newValue: error.toString() }, EVENT_TYPE.error);
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(jwtUser: JwtUser, id: string): Promise<IAuthUser> {
    try {
      const user = await this.authClientApi.deleteUser(id).toPromise();
      // Remove user from mdoadmin DB
      await this.userService.deleteUser(user.globalProfileId.toString());
      // SiemEvent.UserDeprivation because there no delete event
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.deleted, oldValue: { user } }, SiemEvent.UserDeprovision);
      return user;
    } catch (error) {
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.error, newValue: error.toString() }, EVENT_TYPE.error);
      throw new InternalServerErrorException();
    }
  }

  async activateUser(jwtUser: JwtUser, body: IAuthUser, activated = true): Promise<IAuthUser> {
    try {
      const user = await this.authClientApi.updateUser({ ...body, activated }).toPromise();
      await this.createEvent({
        jwtUser,
        topic   : activated ? EVENT_TYPE.activated : EVENT_TYPE.deactivated,
        oldValue: {
          user: {
            ...body,
          },
        },
        newValue: user,
      }, activated ? SiemEvent.UserProvision : SiemEvent.UserDeprovision);
      return user;
    } catch (error) {
      await this.createEvent({ jwtUser, topic: EVENT_TYPE.error, newValue: error.toString() }, EVENT_TYPE.error);
      throw new InternalServerErrorException();
    }
  }

  getApp(): Observable<IAuthApp> {
    return this.authApp ? this.authApp : this.getAndStoreAuthApp();
  }

  getPermissions(): Observable<IAuthPermission[]> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.getPermissions(app._id)),
      );
  }

  createRole(role: IAuthRole): Observable<IAuthRole> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.createRole({
          ...role,
          appId: app._id,
        })),
      );
  }

  getRoles(): Observable<IAuthRole[]> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.getAppRoles(app._id)),
      );
  }

  createGroup(group: IAuthGroup): Observable<IAuthGroup> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.createGroup({
          ...group,
          appId: app._id,
        })),
      );
  }

  getGroups(): Observable<IAuthGroup[]> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.getAppGroups(app._id)),
      );
  }

  assignGroupsRoles(groupsRoles: Record<string, string[]>): any {
    const appName = this.authClientApi.getAppName();
    return this.authClientApi.assignGroupsRoles(appName, groupsRoles);
  }

  addGroupUser(
    groupId: string,
    globalProfileId: string,
  ): Observable<IAuthGroupUser> {
    return this.authClientApi.addGroupUser(groupId, globalProfileId);
  }

  createPermission(permission: string): Observable<IAuthPermission> {
    return this.getApp()
      .pipe(
        switchMap(app => this.authClientApi.createPermission(app, permission)),
      );
  }

  getUsersWithRoles(): Observable<IAuthData> {
    return zip(this.getUser({ includeRoles: true }), this.getRoles())
      .pipe(
        map(([ users, appRoles ]) =>
          users.map(user => {
            const roles = appRoles.filter(role => user.roles.includes(role._id));
            return { user, roles } as IAuthData;
          }),
        ),
        map((users: IAuthData[]) => {
          const isLastSecurityAdmin = users.reduce((securityAdminCount, user) =>
              user.roles.some(role => role.name === 'security admin') ? securityAdminCount + 1 : securityAdminCount,
            0) === 1;
          return users.map(user => ({ ...user, isLastSecurityAdmin }));
        }),
        switchMap(users => from(users)),
      );
  }

  getUsersWithRolesFiltered(
    roleId: string,
    status: string,
    queryString: string,
  ): Observable<IAuthData[]> {
    return this.getUsersWithRoles()
      .pipe(
        filter(({ roles, user }) => {
          const fieldList = [ user.firstName, user.lastName, user.email, user.globalProfileId.toString() ];
          return roles.some(role => !roleId || role._id === roleId)
            && (!status || user.activated.toString() === status)
            && fieldList.some(field => field.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        }),
        toArray(),
      );
  }

  private getAndStoreAuthApp() {
    this.authApp = this.authClientApi.getApp();
    return this.authApp;
  }

  private mapAvailableManageRolesPermissions(
    roles: IAuthRole[],
    manageRolesPermissions: ManageRolesPermissionData[],
    permissions: IAuthPermission[]): AvailableRoleToManagePermissions[] {
    const managePermissionsNames = manageRolesPermissions.map(manage => manage.permission);
    const filteredPermissions = chain(permissions)
      .filter(({ name }) => managePermissionsNames.includes(name))
      .value();
    const filteredPermissionsIds = chain(filteredPermissions)
      .map(permission => permission._id)
      .value();
    const disabledRolesForManage = chain(manageRolesPermissions)
      .map(manage => manage.disabledRolesForManage)
      .filter(disabledRoles => disabledRoles.length > 0)
      .flattenDeep()
      .uniq()
      .value();

    return chain(roles)
      .filter(
        role => role.permissions.some(permissionId => filteredPermissionsIds.includes(permissionId))
        || disabledRolesForManage.includes(role.name)
      )
      .map(({ _id, name, permissions }) => ({
        _id,
        name,
        permissions: permissions
          .filter(permissionId => filteredPermissionsIds.includes(permissionId))
          .map(permissionId => filteredPermissions.find(permission => permission._id === permissionId)?.name)
      }))
      .value();
  }
}
