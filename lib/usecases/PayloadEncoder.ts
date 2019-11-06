import msgpack from 'msgpack-lite'

import { Payload, PayloadValidator } from '../entities/Payload'

export const PayloadEncoder = {
  encode(payload: Payload): Buffer {
    return msgpack.encode(payload)
  },
  decode(payloadBuf: Buffer): Payload {
    const payload = msgpack.decode(payloadBuf)
    if (!PayloadValidator.isPayload(payload)) {
      throw new Error(`[NOT_PAYLOAD_ERROR] ${JSON.stringify(payload)}`)
    }
    return payload
  },
}
