import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly eventEmitter: EventEmitter2) {
  }

  use({ url, user }: Request, res: Response, next: NextFunction) {
    this.eventEmitter.emit(
      'system.loggerMiddleware',
      {
        context: LoggerMiddleware.name,
        data   : {
          topic: url,
          user : user as any,
          data : null,
        },
      });
    next();
  }
}
