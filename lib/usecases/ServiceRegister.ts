import { ServiceStore } from '../entities/ServiceStore'
import { ServiceFactory, ServiceOptions } from '../entities/Service'

export class ServiceRegister {
  serviceStore: ServiceStore
  serviceFactory: ServiceFactory

  async registerService(id: string, options: ServiceOptions) {
    const service = this.serviceFactory(id, options)
    await this.serviceStore.set(service)
  }

  async unregisterService(id: string) {
    await this.serviceStore.del(id)
  }
}
