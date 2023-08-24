import { inject, injectable } from 'tsyringe'
import { Endpoint } from '../../enterprise/entities/endpoint'
import { HttpMethod } from '../../enterprise/enums/http-method'
import { EndpointAlreadyExistsError } from '../errors/endpoint-already-exists-error'
import { EndpointsRepository } from '../repositories/endpoints-repository'

interface CreateEndpointUseCaseRequest {
  title: string
  description: string
  httpMethod: HttpMethod
  uri: string
}

interface CreateEndpointUseCaseResponse {
  endpoint: Endpoint
}

@injectable()
export class CreateEndpointUseCase {
  constructor(
    @inject('EndpointsRepository')
    private endpointsRepository: EndpointsRepository,
  ) {}

  async execute({
    title,
    description,
    httpMethod,
    uri,
  }: CreateEndpointUseCaseRequest): Promise<CreateEndpointUseCaseResponse> {
    const existingEndpoint = await this.endpointsRepository.findByTitle(title)

    if (existingEndpoint) {
      throw new EndpointAlreadyExistsError()
    }

    const endpoint = Endpoint.create({
      title,
      description,
      httpMethod,
      uri,
    })

    await this.endpointsRepository.create(endpoint)

    return {
      endpoint,
    }
  }
}
