import { RequestPayload, ResponsePayload } from './Payload'

export interface ServiceOptions {
  timeout?: number
}
export type ServiceCall = (
  req: RequestPayload,
  options: ServiceOptions,
) => Promise<ResponsePayload>

export interface Service {
  id: string
  call: ServiceCall
}

export type ServiceFactory = (
  id: string,
  defaultOptions: ServiceOptions,
) => Service

export const createServiceFactory = ({
  call,
}: {
  call: ServiceCall
}): ServiceFactory => (id, defaultOptions) => ({
  id,
  call: (req: RequestPayload, options: ServiceOptions) =>
    call(req, { ...defaultOptions, ...options }),
})
