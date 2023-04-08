function mockService(service) {
  const methods = Object.getOwnPropertyNames(service.prototype);

  class mockedService {}

  methods.forEach(method => {
    mockedService.prototype[method] = () => null;
  });

  return mockedService;
}

export function provideMockService(service): any {
  return {
    provide : service,
    useClass: mockService(service)
  };
}
