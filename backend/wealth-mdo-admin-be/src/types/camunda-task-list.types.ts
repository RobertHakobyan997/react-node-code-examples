export interface CamundaTaskList {
  id: string;
  name: string;
  assignee: string;
  owner: string;
  created: string;
  due: string;
  followUp: string;
  delegationState: string;
  description: string;
  executionId: string;
  parentTaskId: string;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  caseExecutionId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  taskDefinitionKey: string;
  suspended: boolean;
  formKey: string;
  tenantId: string;
}

