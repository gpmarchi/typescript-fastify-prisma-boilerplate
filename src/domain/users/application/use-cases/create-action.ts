import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Action } from '../../enterprise/entities/action'
import { ActionAlreadyExistsError } from '../errors/action-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ActionsRepository } from '../repositories/actions-repository'
import { ResourcesRepository } from '../repositories/resources-repository'

interface CreateActionUseCaseRequest {
  resourceId: string
  title: string
  description: string
}

interface CreateActionUseCaseResponse {
  action: Action
}

export class CreateActionUseCase {
  constructor(
    private actionsRepository: ActionsRepository,
    private resourcesRepository: ResourcesRepository,
  ) {}

  async execute({
    resourceId,
    title,
    description,
  }: CreateActionUseCaseRequest): Promise<CreateActionUseCaseResponse> {
    const existingAction = await this.actionsRepository.findByTitle(title)

    if (existingAction) {
      throw new ActionAlreadyExistsError()
    }

    const resource = await this.resourcesRepository.findById(resourceId)

    if (!resource) {
      throw new ResourceNotFoundError()
    }

    const action = Action.create({
      resourceId: new UniqueEntityID(resourceId),
      title,
      description,
    })

    await this.actionsRepository.create(action)

    return {
      action,
    }
  }
}
