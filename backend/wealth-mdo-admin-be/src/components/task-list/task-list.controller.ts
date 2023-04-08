import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { API_RESPONSE_DESCRIPTIONS } from '../../constants';
import { TASKLIST_CONSTANTS } from '../../constants/task-list.constants';
import { CamundaProcessInstance } from '../../types/camunda-process-instance.types';
import { CamundaProcessDefinition } from '../../types/camunda-process-definition.types';
import { CamundaTaskList } from '../../types/camunda-task-list.types';
import { CamundaProcessInstanceStatus } from '../../types/camunda-process-instace-status.types';

import { TaskListService } from './task-list.service';

@ApiTags(TASKLIST_CONSTANTS.TASKLIST)
@Controller(TASKLIST_CONSTANTS.TASKLIST)
@UseGuards(AuthGuard())
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {
  }

  @ApiOperation({ description: 'Camunda API health check' })
  @ApiResponse({
    status     : 200,
    description: 'Boolean value that depends on Camunda API availability',
  })
  @Get(TASKLIST_CONSTANTS.HEALTH_CHECK)
  healthCheck(): Observable<boolean> {
    return this.taskListService.healthCheck();
  }

  @ApiOperation({ description: 'Get BPMN content' })
  @ApiResponse({
    status     : 200,
    description: 'Get BPMN content',
  })
  @Get(TASKLIST_CONSTANTS.MODEL)
  receiveBusinessModel(
    @Query('processDefinitionKey') processDefinitionKey: string,
    @Query('tenantId') tenantId: string,
  ): Observable<string> {
    return this.taskListService.getBusinessModel(
      processDefinitionKey,
      tenantId,
    );
  }

  @ApiOperation({ description: 'Instantiates a given process definition' })
  @ApiResponse({
    status     : 201,
    description: API_RESPONSE_DESCRIPTIONS.REQUEST_SUCCESSFUL,
  })
  @ApiResponse({
    status     : 500,
    description: 'Something went wrong on Camunda side',
  })
  @Post(TASKLIST_CONSTANTS.START_PROCESS)
  startProcessInstance(
    @Query('processDefinitionKey') processDefinitionKey: string,
    @Query('tenantId') tenantId: string,
  ): Observable<boolean> {
    return this.taskListService.startProcessInstance(
      processDefinitionKey,
      tenantId,
    );
  }

  @ApiOperation({ description: 'Get list of process instances' })
  @ApiResponse({
    status     : 200,
    description: API_RESPONSE_DESCRIPTIONS.REQUEST_SUCCESSFUL,
  })
  @Get(TASKLIST_CONSTANTS.PROCESS_INSTANCE)
  getProcessInstancesList(
    @Query('processDefinitionKey') processDefinitionKey: string,
  ): Observable<CamundaProcessInstance> {
    return this.taskListService.getProcessInstancesList(processDefinitionKey);
  }

  @ApiOperation({ description: 'Get list of process definitions' })
  @ApiResponse({
    status     : 200,
    description: API_RESPONSE_DESCRIPTIONS.REQUEST_SUCCESSFUL,
  })
  @Get(TASKLIST_CONSTANTS.PROCESS_DEFINITION)
  getProcessDefinitionsList(): Observable<CamundaProcessDefinition> {
    return this.taskListService.getProcessDefinitionsList();
  }

  @ApiOperation({ description: 'Get list of tasks by process instance id' })
  @ApiResponse({
    status     : 200,
    description: API_RESPONSE_DESCRIPTIONS.REQUEST_SUCCESSFUL,
  })
  @Get(TASKLIST_CONSTANTS.TASKS_BY_PROCESS_INSTANCE_ID)
  getTasksList(
    @Query('processInstanceId') processInstanceId: string,
  ): Observable<CamundaTaskList> {
    return this.taskListService.getTasksList(processInstanceId);
  }

  @ApiOperation({ description: 'Get process status by process instance id' })
  @ApiResponse({
    status     : 200,
    description: API_RESPONSE_DESCRIPTIONS.REQUEST_SUCCESSFUL,
  })
  @Get(TASKLIST_CONSTANTS.PROCESS_STATUS_BY_PROCESS_INSTANCE_ID)
  getProcessInstanceStatus(
    @Query('processInstanceId') processInstanceId: string,
  ): Observable<CamundaProcessInstanceStatus> {
    return this.taskListService.getProcessInstanceStatus(processInstanceId);
  }
}
