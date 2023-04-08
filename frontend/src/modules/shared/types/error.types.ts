export const enum ErrorCode {
  invalidProvider = 'invalidProvider',
  invalidEmail = 'invalidEmail',
  invalidOTP = 'invalidOTP',
  emptyEmail = 'emptyEmail',
  invalidReferralCode = 'invalidReferralCode',
  'ErrorCode.INVALID_REFERRAL_CODE' = '"ErrorCode.INVALID_REFERRAL_CODE"',
}

export interface ErrorResponse {
  detail: {
    message: string
    code: ErrorCode
    provider: string
  }
}
