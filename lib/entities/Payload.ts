import uuid from 'uuid'

export interface RequestPayload {
  id: string
  body: string | Buffer
  type: 'req'
}

export interface ResponsePayload {
  id: string
  body: string | Buffer
  type: 'res'
}

export type Payload = RequestPayload | ResponsePayload

export const PayloadFactory = {
  request(body: string | Buffer): RequestPayload {
    return {
      id: uuid.v4(),
      body,
      type: 'req',
    }
  },
  responseOf(
    request: RequestPayload,
    responseBody: string | Buffer,
  ): ResponsePayload {
    return {
      id: request.id,
      body: responseBody,
      type: 'res',
    }
  },
}

export const PayloadValidator = {
  isPayload(payload: unknown): payload is Payload {
    if (!payload) {
      return false
    }
    const casted = payload as Payload
    return (
      typeof casted.id === 'string' &&
      (typeof casted.body === 'string' || Buffer.isBuffer(casted.body)) &&
      (casted.type === 'req' || casted.type === 'res')
    )
  },
  isRequestPayload(payload: unknown): payload is RequestPayload {
    return PayloadValidator.isPayload(payload) && payload.type === 'req'
  },
  isResponsePayload(payload: unknown): payload is ResponsePayload {
    return PayloadValidator.isPayload(payload) && payload.type === 'res'
  },
}
