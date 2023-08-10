import { EndpointsRepository } from '@/domain/users/application/repositories/endpoints-repository'
import { Endpoint } from '@/domain/users/enterprise/entities/endpoint'

export class InMemoryEndpointsRepository implements EndpointsRepository {
  public items: Endpoint[] = []

  async findByTitle(title: string): Promise<Endpoint | null> {
    const endpoint = this.items.find((endpoint) => endpoint.title === title)

    if (!endpoint) {
      return null
    }

    return endpoint
  }

  async findById(id: string): Promise<Endpoint | null> {
    const endpoint = this.items.find(
      (endpoint) => endpoint.id.toString() === id,
    )

    if (!endpoint) {
      return null
    }

    return endpoint
  }

  async create(endpoint: Endpoint): Promise<void> {
    this.items.push(endpoint)
  }
}
