import WebSocket from 'ws'
import {
  RequestPayload,
  ResponsePayload,
  encodePayload,
  decodePayload,
} from './Payload'
import { asyncWrapWs } from '../helpers/asyncWrap'

export interface ServiceProxy {
  id: string
  call: (arg: RequestPayload) => Promise<ResponsePayload>
}

export class WsServiceProxy implements ServiceProxy {
  id: string
  ws: WebSocket

  constructor(id: string, ws: WebSocket) {
    this.id = id
    this.ws = ws
  }

  async call(req: RequestPayload) {
    const { ws } = this
    return new Promise(
      (
        resolve: (res: ResponsePayload) => void,
        reject: (reason: string) => void,
      ) => {
        asyncWrapWs(ws)
          .send(encodePayload(req))
          .catch((err) =>
            reject(`Failed to call with web socket error: "${err.message}"`),
          )
        ws.addListener('message', function onMessage(message: Buffer) {
          const res = decodePayload(message) as ResponsePayload
          const isRes = (res: ResponsePayload) =>
            res.type === 'res' && res.id === req.id
          if (isRes(res)) {
            ws.removeListener('message', onMessage)
            resolve(res)
          }
        })
      },
    )
  }
}
