import { Payments } from './payments'
import { Notifications } from './notifications'
import { LegibleCashbillConfiguratin } from './types'

class LegibleCashbill {
  public readonly payments: Payments
  public readonly notifications: Notifications

  constructor(private readonly configuration: LegibleCashbillConfiguratin) {
    const defaultConfig = {
      ...configuration,
      apiUrl: 'https://pay.cashbill.pl/ws/rest',
    }
    this.configuration = { ...configuration, ...defaultConfig }
    this.payments = new Payments(configuration)
    this.notifications = new Notifications(configuration)
  }
}

export { LegibleCashbill }
export * from './types'
