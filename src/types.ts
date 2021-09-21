export type LegibleCashbillConfiguratin = {
  secret: string
  shopId: string
  apiUrl?: string
}

export type PersonalData = Partial<{
  firstName: string
  surname: string
  email: string
  country: string
  city: string
  postcode: string
  street: string
  house: string
  flat: string
}>

export enum PaymentStatus {
  START = 'Start',
  NEGATIVE_AUTHORIZATION = 'NegativeAuthorization',
  ABORT = 'Abort',
  FRAUD = 'Fraud',
  POSITIVE_AUTHORIZATION = 'PositiveAuthorization',
  POSITIVE_FINISH = 'PositiveFinish',
  NEGATIVE_FINISH = 'NegativeFinish',
  TIME_EXCEEDED = 'TimeExceeded',
  CRITICAL_ERROR = 'CriticalError',
}

export type Payment = {
  id: string
  title: string
  status: PaymentStatus
  paymentChannel: string
  description: string
  additionalData?: string
  amount: {
    currencyCode: string
    value: number
  }
  requestedAmount: {
    currencyCode: string
    value: number
  }
  personalData: PersonalData
}

export enum NotificationCommand {
  TRANSACTION_STATUS_CHANGED = 'transactionStatusChanged',
  VERIFICATION_FINISHED = 'verificationFinished',
}

export type Notification = {
  paymentId: string
}

export type NotificationRequest = {
  cmd: NotificationCommand
  args: string
  sign: string
}

export type PaymentDto = {
  title: string
  amount: {
    value: number
    currencyCode: string
  }
  description: string
  additionalData?: string
  returnUrl?: string
  negativeReturnUrl?: string
  paymentChannel?: string
  languageCode?: string
  personalData?: PersonalData
  referer?: string
}

export type PaymentResponse = {
  id: string
  redirectUrl: string
}
