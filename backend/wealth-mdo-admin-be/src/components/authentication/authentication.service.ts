import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthenticationService {
  constructor(private readonly eventEmitter: EventEmitter2) {
  }

  onLogout(user: any) {
    this.eventEmitter.emit(
      'onLogout',
      {
        context: AuthenticationService.name,
        data   : {
          topic: 'logout',
          user : user,
          data : null,
        },
      },
    );
  }
}
