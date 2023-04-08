import { mockProcessInstanceCommonResponse } from './process-instance.common.response.const';

export const mockProcessDefinitionList = {
  data: [
    {
      links: [],
      id: '0720da72-6d10-11eb-8b32-0242ac110002',
      ...mockProcessInstanceCommonResponse,
    },
    {
      links: [],
      id: '3d4d92b5-6f76-11eb-9a1b-0242ac110002',
      ...mockProcessInstanceCommonResponse,
    },
  ],
  status: 200,
};
