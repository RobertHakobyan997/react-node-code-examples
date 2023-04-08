import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { RegisteredUser } from '../../types/registered-users.types';

import { SecurityKey, SecurityKeyGuard } from './guards/security-key.guard';
import { RegisteredUsersService } from './registered-users.service';

@Controller('registered-users')
@ApiTags('Registered Users')
@UseGuards(SecurityKeyGuard)
export class RegisteredUsersController {
  constructor(
    private readonly registeredUsersService: RegisteredUsersService
  ) {}

  @ApiOperation({
    description: 'get all users for AD deactivation check'
  })
  @ApiHeader({
    name: 'authorizationAccessKey',
    description: 'Data Access export key',
  })
  @ApiOkResponse({
    description: 'Return all users from authorization service in required format',
    type: RegisteredUser
  })
  @Get()
  @SecurityKey({ securityKey: 'authorizationAccessKey', headerKey: 'authorizationAccessKey' })
  getAllUsers(): Observable<RegisteredUser[]> {
    return this.registeredUsersService.getUsers();
  }
}
