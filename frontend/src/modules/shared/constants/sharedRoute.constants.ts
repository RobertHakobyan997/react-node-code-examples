export const SharedRouteConstants = {
  login: () => '/login',
  fallback: () => '*',
  authorization: () => '/authorization',
  createProfile: () => '/create-profile',
  userAccount: ({ uuid }: { uuid?: string }) => `/account/${uuid ?? ''}`,
  deleteAccount: () => '/delete-account',
  sberbankPaymentUrl: () =>
    'https://secure-payment-gateway.ru/payment/merchants',
}
