export const getContext = (req: Object): any => ({
    getClass: () => null,
    getHandler: () => null,
    getArgs: () => null,
    getArgByIndex: () => null,
    switchToRpc: () => null,
    switchToHttp: () => ({
      getRequest: (): any => ({
        ...req,
      }),
      getResponse: () => null,
      getNext: () => null,
    }),
    switchToWs: () => null,
    getType: () => null,
  });
