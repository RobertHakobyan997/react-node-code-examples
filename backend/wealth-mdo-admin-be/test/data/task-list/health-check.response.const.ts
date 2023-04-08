const healthCheckCommonResponseData = {
  data: {
    results: [
      {
        name: 'default',
      },
    ],
  },
};

export const mockHealthCheckResponse = {
  ...healthCheckCommonResponseData,
  status: 200,
};

export const mockHealthCheckResponseFailed = {
  ...healthCheckCommonResponseData,
  status: 500,
};
