import { Endpoint } from '../../enterprise/entities/endpoint'
import { EndpointAlreadyExistsError } from '../errors/endpoint-already-exists-error'
import { EndpointsRepository } from '../repositories/endpoints-repository'

interface CreateEndpointUseCaseRequest {
  title: string
  description: string
  uri: string
}

interface CreateEndpointUseCaseResponse {
  endpoint: Endpoint
}

export class CreateEndpointUseCase {
  constructor(private endpointsRepository: EndpointsRepository) {}

  async execute({
    title,
    description,
    uri,
  }: CreateEndpointUseCaseRequest): Promise<CreateEndpointUseCaseResponse> {
    const existingEndpoint = await this.endpointsRepository.findByTitle(title)

    if (existingEndpoint) {
      throw new EndpointAlreadyExistsError()
    }

    const endpoint = Endpoint.create({
      title,
      description,
      uri,
    })

    await this.endpointsRepository.create(endpoint)

    return {
      endpoint,
    }
  }
}
