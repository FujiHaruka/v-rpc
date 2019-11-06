import {
  ResponsePayload,
  PayloadValidator,
  PayloadFactory,
} from '../entities/Payload'

import { PayloadEncoder } from './PayloadEncoder'

export type ClientMethod = (
  arg: string | Buffer,
) => Promise<string | Buffer> | string | Buffer

export type SendResponsePayload = (resp: ResponsePayload) => Promise<void>

export class ClientMessage {
  method: ClientMethod
  sendResponsePayload: SendResponsePayload

  async handleMessage(message: unknown) {
    if (!Buffer.isBuffer(message)) {
      console.error('[INVALID_REQUEST_MESSAGE_ERROR]')
      return
    }
    const request = PayloadEncoder.decode(message)
    if (!PayloadValidator.isRequestPayload(request)) {
      console.error('[INVALID_REQUEST_MESSAGE_ERROR]')
      return
    }
    const result = await this.method(request.body)
    const response = PayloadFactory.responseOf(request, result)
    await this.sendResponsePayload(response)
  }
}
