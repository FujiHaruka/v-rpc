import WebSocket from 'ws'
import { Server } from 'http'

/**
 * Wrap wss methods as async methods
 */
export const asyncWrapWss = (wss: WebSocket.Server) => ({
  waitListening: async () => {
    return new Promise((resolve) => {
      wss.on('listening', () => {
        resolve()
      })
    })
  },
  waitConnection: async () => {
    return new Promise((resolve: (ws: WebSocket) => void) => {
      wss.once('connection', (ws) => resolve(ws))
    })
  },
  close: async () => {
    await new Promise((resolve, reject) => {
      wss.close((err) => (err ? reject(err) : resolve()))
    })
  },
})

/**
 * Wrap ws methods as async methods
 */
export const asyncWrapWs = (ws: WebSocket) => ({
  waitOpen: async () => {
    return new Promise((resolve) => {
      ws.once('open', () => resolve())
    })
  },
  send: async (data: any) => {
    return new Promise((resolve, reject) => {
      ws.send(data, (err?: Error) => (err ? reject(err) : resolve()))
    })
  },
})

export const asyncHttp = (server: Server) => ({
  listen: async (port: number) => {
    return new Promise((resolve) => {
      server.listen(port, () => {
        resolve()
      })
    })
  },
  close: async () => {
    return new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()))
    })
  },
})
