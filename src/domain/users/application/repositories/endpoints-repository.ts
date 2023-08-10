import { Endpoint } from '../../enterprise/entities/endpoint'

export interface EndpointsRepository {
  findByTitle(title: string): Promise<Endpoint | null>
  findById(id: string): Promise<Endpoint | null>
  create(endpoint: Endpoint): Promise<void>
}
