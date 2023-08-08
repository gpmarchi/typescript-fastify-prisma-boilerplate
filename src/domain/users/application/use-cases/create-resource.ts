import { Resource } from '../../enterprise/entities/resource'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { ResourcesRepository } from '../repositories/resources-repository'

interface CreateResourceUseCaseRequest {
  title: string
  description: string
  endpoint: string
}

interface CreateResourceUseCaseResponse {
  resource: Resource
}

export class CreateResourceUseCase {
  constructor(private resourcesRepository: ResourcesRepository) {}

  async execute({
    title,
    description,
    endpoint,
  }: CreateResourceUseCaseRequest): Promise<CreateResourceUseCaseResponse> {
    const existingResource = await this.resourcesRepository.findByTitle(title)

    if (existingResource) {
      throw new ResourceAlreadyExistsError()
    }

    const resource = Resource.create({
      title,
      description,
      endpoint,
    })

    await this.resourcesRepository.create(resource)

    return {
      resource,
    }
  }
}
