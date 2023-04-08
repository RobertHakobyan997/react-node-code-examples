import { mockProcessInstanceCommonResponse } from './process-instance.common.response.const';

export const mockProcessInstanceResponse = {
  data: [
    {
      links: [
        {
          method: 'GET',
          href:
            'http://spb-mmdo01.internal.corp:8080/engine-rest/process-instance/3d4d92b5-6f76-11eb-9a1b-0242ac110002',
          rel: 'self',
        },
      ],
      id: '3d4d92b5-6f76-11eb-9a1b-0242ac110002',
      ...mockProcessInstanceCommonResponse,
    },
  ],
  status: 200,
};
