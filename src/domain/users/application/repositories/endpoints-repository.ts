import { Endpoint } from '../../enterprise/entities/endpoint'
import { HttpMethod } from '../../enterprise/enums/http-method'

export interface EndpointsRepository {
  findByTitle(title: string): Promise<Endpoint | null>
  findById(id: string): Promise<Endpoint | null>
  findByHttpMethodAndUri(
    httpMethod: HttpMethod,
    uri: string,
  ): Promise<Endpoint | null>
  create(endpoint: Endpoint): Promise<void>
}
