import { HttpModule, Module } from '@nestjs/common';

import { RequestService } from '../../core/request/request.service';

import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';

@Module({
  imports: [ HttpModule ],
  controllers: [ TaskListController ],
  providers: [ RequestService, TaskListService ],
})
export class TaskListModule {}
