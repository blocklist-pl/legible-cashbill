import crypto from 'crypto'

import { Module } from './module'
import { NotificationRequest, Notification } from './types'

export class Notifications extends Module {
  async get(request: NotificationRequest) {
    if (!this.verify(request)) {
      throw new Error('Could not verify notification request.')
    }

    const { args } = request
    return { paymentId: args } as Notification
  }

  private verify(request: NotificationRequest) {
    const { cmd, args, sign: incomingSignature } = request

    const expectedSignature = crypto
      .createHash('md5')
      .update(cmd + args + this.configuration.secret)
      .digest('hex')

    return expectedSignature === incomingSignature
  }
}
