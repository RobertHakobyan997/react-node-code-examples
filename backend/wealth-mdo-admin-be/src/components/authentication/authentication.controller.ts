import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../authorization/decorators/user.decorator';

import { AuthenticationService } from './authentication.service';

@UseGuards(AuthGuard())
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('logout')
  async logout(@User() user: any) {
    return this.authService.onLogout(user);
  }
}
