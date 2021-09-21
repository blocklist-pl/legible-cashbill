import crypto from 'crypto'
import axios from 'axios'
import qs from 'qs'

import { Module } from './module'
import { Payment, PaymentDto, PaymentResponse } from './types'

export class Payments extends Module {
  protected readonly moduleConfiguration = {
    createPaymentUrl: `${this.configuration.apiUrl}/payment/${this.configuration.shopId}/`,
    retrievePaymentUrl: (id: string, signature: string) =>
      `${this.configuration.apiUrl}/payment/${this.configuration.shopId}/${id}?sign=${signature}`,
  }

  async create(dto: PaymentDto) {
    const signature = this.getCreatePaymentSignature(dto)
    const payload = Object.entries({
      ...dto,
      sign: signature,
    }).reduce((prev, [key, value]) => {
      if (typeof value === 'object') {
        const nestedObjects = Object.entries(value).reduce(
          (prevNested, [nestedKey, nestedValue]) => ({
            ...prevNested,
            [`${key}.${nestedKey}`]: nestedValue,
          }),
          {},
        )

        return { ...prev, ...nestedObjects }
      }

      return { ...prev, [key]: value }
    }, {})

    try {
      const { data } = await axios.post(
        this.moduleConfiguration.createPaymentUrl,
        qs.stringify(payload),
      )
      return data as PaymentResponse
    } catch (error) {
      throw new Error(`Could not create payment. Reason: ${error.message}`)
    }
  }

  async retrieve(id: string) {
    const { data } = await axios.get(
      this.moduleConfiguration.retrievePaymentUrl(
        id,
        this.getRetrievePaymentSignature(id),
      ),
    )
    return data as Payment
  }

  private getRetrievePaymentSignature(id: string): string {
    return crypto
      .createHash('sha1')
      .update(id + this.configuration.secret)
      .digest('hex')
  }

  private getCreatePaymentSignature(dto: PaymentDto): string {
    const normalizedPersonalData = dto.personalData || {}
    return crypto
      .createHash('sha1')
      .update(
        dto.title +
          dto.amount.value +
          dto.amount.currencyCode +
          (dto.returnUrl || '') +
          dto.description +
          (dto.negativeReturnUrl || '') +
          (dto.additionalData || '') +
          (dto.paymentChannel || '') +
          (dto.languageCode || '') +
          (dto.referer || '') +
          (normalizedPersonalData.firstName || '') +
          (normalizedPersonalData.surname || '') +
          (normalizedPersonalData.email || '') +
          (normalizedPersonalData.country || '') +
          (normalizedPersonalData.city || '') +
          (normalizedPersonalData.postcode || '') +
          (normalizedPersonalData.street || '') +
          (normalizedPersonalData.house || '') +
          (normalizedPersonalData.flat || '') +
          this.configuration.secret,
      )
      .digest('hex')
  }
}
