import { HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AxiosBasicCredentials, AxiosRequestConfig } from 'axios'; // NOSONAR

import camundaConfig from '../../config/camunda.config';
import { RequestService } from '../../core/request/request.service';
import { CamundaProcessInstance } from '../../types/camunda-process-instance.types';
import { CamundaProcessDefinition } from '../../types/camunda-process-definition.types';
import { CamundaTaskList } from '../../types/camunda-task-list.types';
import { CamundaProcessInstanceStatus } from '../../types/camunda-process-instace-status.types';

@Injectable()
export class TaskListService {
  private readonly camundaCredential: AxiosBasicCredentials = {
    username: camundaConfig.apiUsername,
    password: camundaConfig.apiPassword,
  };

  constructor(private readonly request: RequestService) {
  }

  healthCheck(): Observable<boolean> {
    const url = `${camundaConfig.apiHost}/engine`;
    return this.request
      .request<boolean>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(),
      })
      .pipe(map(res => res.status === HttpStatus.OK));
  }

  getBusinessModel(
    processDefinitionKey: string,
    tenantId: string,
  ): Observable<string> {
    const url = this.getBusinessModelRequestUrl(
      processDefinitionKey,
      tenantId,
    );
    return this.request
      .request<string>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(),
      })
      .pipe(pluck('data', 'bpmn20Xml'));
  }

  startProcessInstance(
    processDefinitionKey: string,
    tenantId: string,
  ): Observable<boolean> {
    const url = this.getStartProcessRequestUrl(
      processDefinitionKey,
      tenantId,
    );
    return this.request
      .request<boolean>({
        url,
        method: 'POST',
        ...this.createRequestConfigWithAuth(),
      })
      .pipe(map(res => res.status === HttpStatus.OK));
  }

  getProcessInstancesList(
    processDefinitionKey: string,
  ): Observable<CamundaProcessInstance> {
    const url = `${camundaConfig.apiHost}/process-instance`;
    const requestConfig: AxiosRequestConfig = {
      params: {
        processDefinitionKey: processDefinitionKey,
      },
    };
    return this.request
      .request<CamundaProcessInstance>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(requestConfig),
      })
      .pipe(pluck('data'));
  }

  getProcessDefinitionsList(): Observable<CamundaProcessDefinition> {
    const url = `${camundaConfig.apiHost}/process-definition`;
    return this.request
      .request<CamundaProcessDefinition>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(),
      })
      .pipe(pluck('data'));
  }

  getTasksList(processInstanceId: string): Observable<CamundaTaskList> {
    const url = `${camundaConfig.apiHost}/task`;
    const requestConfig: AxiosRequestConfig = {
      params: {
        processInstanceId: processInstanceId,
      },
    };
    return this.request
      .request<CamundaTaskList>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(requestConfig),
      })
      .pipe(pluck('data'));
  }

  getProcessInstanceStatus(
    processInstanceId: string,
  ): Observable<CamundaProcessInstanceStatus> {
    const url = `${camundaConfig.apiHost}/process-instance/${processInstanceId}`;
    return this.request
      .request<CamundaProcessInstance>({
        url,
        method: 'GET',
        ...this.createRequestConfigWithAuth(),
      })
      .pipe(
        pluck('data'),
        map(({ id, ended, suspended }) => ({ id, ended, suspended })),
      );
  }

  private getBusinessModelRequestUrl(
    definitionKey: string,
    tenantId: string,
  ): string {
    if (definitionKey && tenantId)
      return `${camundaConfig.apiHost}/process-definition/key/${definitionKey}/tenant-id/${tenantId}/xml`;

    return `${camundaConfig.apiHost}/process-definition/key/${definitionKey}/xml`;
  }

  private getStartProcessRequestUrl(
    definitionKey: string,
    tenantId: string,
  ): string {
    if (definitionKey && tenantId)
      return `${camundaConfig.apiHost}/process-definition/key/${definitionKey}/tenant-id/${tenantId}/start`;

    return `${camundaConfig.apiHost}/process-definition/key/${definitionKey}/start`;
  }

  private createRequestConfigWithAuth(
    additionalParams?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return { auth: this.camundaCredential, headers: { apikey: camundaConfig.apiKey }, ...additionalParams };
  }
}
