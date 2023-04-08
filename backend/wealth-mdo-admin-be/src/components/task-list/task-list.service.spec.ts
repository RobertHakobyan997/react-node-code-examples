import { of, throwError } from 'rxjs';

import {
  mockHealthCheckResponse,
  mockModelResponse,
  mockProcessInstanceList,
  mockProcessInstanceResponse,
  mockProcessDefinitionList,
  mockTasksListResponse,
  mockProcessInstanceStatus,
  mockProcessInstanceStatusResult,
  mockHealthCheckResponseFailed,
} from '../../../test/data/task-list';
import { CAMUNDA_PROCESS } from '../../../test/data/task-list/process.constants';

import { assert } from './task-list.service.spec-setup';
import { TaskListService } from './task-list.service';

describe('Tasklist service: ', () => {
  let taskListService: TaskListService;

  beforeAll(async () => {
    taskListService = await assert();
  });

  describe('healthCheck', () => {
    it('should return boolean value that depends on Camunda API availability', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockHealthCheckResponse) as any
      );
      taskListService.healthCheck().subscribe(res => expect(res).toBeTruthy());
    });

    it('should simulate unsuccessful healthCheck request and return false', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockHealthCheckResponseFailed) as any
      );
      taskListService.healthCheck().subscribe(res => expect(res).toBeFalsy());
    });
  });

  describe('getBusinessModel', () => {
    it('should return business model', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockModelResponse) as any
      );
      taskListService
        .getBusinessModel(
          CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY,
          CAMUNDA_PROCESS.TENANT_ID
        )
        .subscribe(res =>
          expect(res).toEqual(mockModelResponse.data.bpmn20Xml)
        );
    });

    it('should simulate unsuccessful getBusinessModel request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService
        .getBusinessModel(CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY, null)
        .subscribe(
          res => res,
          error => {
            expect(error).toEqual({ status: 500 });
          }
        );
    });
  });

  describe('getProcessInstancesList', () => {
    it('should return list of process instances', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockProcessInstanceList) as any
      );
      taskListService
        .getProcessInstancesList(CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY)
        .subscribe(res => expect(res).toEqual(mockProcessInstanceList.data));
    });

    it('should simulate unsuccessful getProcessInstancesList request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService
        .getProcessInstancesList(CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY)
        .subscribe(
          res => res,
          error => {
            expect(error).toEqual({ status: 500 });
          }
        );
    });
  });

  describe('getProcessDefinitionsList', () => {
    it('should return list of process instances', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockProcessDefinitionList) as any
      );
      taskListService
        .getProcessDefinitionsList()
        .subscribe(res => expect(res).toEqual(mockProcessDefinitionList.data));
    });

    it('should simulate unsuccessful getProcessDefinitionsList request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService.getProcessDefinitionsList().subscribe(
        res => res,
        error => {
          expect(error).toEqual({ status: 500 });
        }
      );
    });
  });

  describe('startProcessInstance', () => {
    it('should instantiate a given process definition', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockProcessInstanceResponse) as any
      );
      taskListService
        .startProcessInstance(
          CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY,
          CAMUNDA_PROCESS.TENANT_ID
        )
        .subscribe(res => expect(res).toBeTruthy());
    });

    it('should simulate unsuccessful startProcessInstance request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService
        .startProcessInstance(CAMUNDA_PROCESS.PROCESS_DEFENITION_KEY, null)
        .subscribe(
          res => res,
          error => {
            expect(error).toEqual({ status: 500 });
          }
        );
    });
  });

  describe('getTasksList', () => {
    it('should return the list of tasks by process instance id', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockTasksListResponse) as any
      );
      taskListService
        .getTasksList(CAMUNDA_PROCESS.PROCESS_INSTANCE_ID)
        .subscribe(res => expect(res).toEqual(mockTasksListResponse.data));
    });

    it('should simulate unsuccessful getTasksList request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService
        .getTasksList(CAMUNDA_PROCESS.PROCESS_INSTANCE_ID)
        .subscribe(
          res => res,
          error => {
            expect(error).toEqual({ status: 500 });
          }
        );
    });
  });

  describe('getProcessInstanceStatus', () => {
    it('should return the process status by process instance id', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        of(mockProcessInstanceStatus) as any
      );
      taskListService
        .getProcessInstanceStatus(CAMUNDA_PROCESS.PROCESS_INSTANCE_ID)
        .subscribe(res => expect(res).toEqual(mockProcessInstanceStatusResult));
    });

    it('should simulate unsuccessful getProcessInstanceStatus request and return INTERNAL_SERVER_ERROR', async () => {
      jest.spyOn(taskListService[`request`], 'request').mockReturnValue(
        throwError({ status: 500 })
      );
      taskListService
        .getProcessInstanceStatus(CAMUNDA_PROCESS.PROCESS_INSTANCE_ID)
        .subscribe(
          res => res,
          error => {
            expect(error).toEqual({ status: 500 });
          }
        );
    });
  });
});
