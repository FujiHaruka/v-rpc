import { Service } from '../entities/Service'
import { PayloadFactory } from '../entities/Payload'

export class ServiceMessage {
  service: Service

  async handleMessage(payloadBody: Buffer) {
    const request = PayloadFactory.request(payloadBody)
    const response = await this.service.call(request, {})
    return response
  }
}
