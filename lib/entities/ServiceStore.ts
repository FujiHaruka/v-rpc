import { Service } from './Service'

export interface ServiceStore {
  set(service: Service): Promise<void>
  get(serviceId: string): Promise<Service>
  has(serviceId: string): Promise<Service>
  del(serviceId: string): Promise<Service>
}
