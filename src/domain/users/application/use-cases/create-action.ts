import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Action } from '../../enterprise/entities/action'
import { ActionAlreadyExistsError } from '../errors/action-already-exists-error'
import { EndpointNotFoundError } from '../errors/endpoint-not-found-error'
import { ActionsRepository } from '../repositories/actions-repository'
import { EndpointsRepository } from '../repositories/endpoints-repository'

interface CreateActionUseCaseRequest {
  endpointId: string
  title: string
  description: string
}

interface CreateActionUseCaseResponse {
  action: Action
}

export class CreateActionUseCase {
  constructor(
    private actionsRepository: ActionsRepository,
    private endpointsRepository: EndpointsRepository,
  ) {}

  async execute({
    endpointId,
    title,
    description,
  }: CreateActionUseCaseRequest): Promise<CreateActionUseCaseResponse> {
    const existingAction = await this.actionsRepository.findByTitle(title)

    if (existingAction) {
      throw new ActionAlreadyExistsError()
    }

    const endpoint = await this.endpointsRepository.findById(endpointId)

    if (!endpoint) {
      throw new EndpointNotFoundError()
    }

    const action = Action.create({
      endpointId: new UniqueEntityID(endpointId),
      title,
      description,
    })

    await this.actionsRepository.create(action)

    return {
      action,
    }
  }
}
