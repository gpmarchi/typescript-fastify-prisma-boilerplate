import { Action } from '../../enterprise/entities/action'
import { ActionAlreadyExistsError } from '../errors/action-already-exists-error'
import { ActionsRepository } from '../repositories/actions-repository'

interface CreateActionUseCaseRequest {
  title: string
  description: string
}

interface CreateActionUseCaseResponse {
  action: Action
}

export class CreateActionUseCase {
  constructor(private actionsRepository: ActionsRepository) {}

  async execute({
    title,
    description,
  }: CreateActionUseCaseRequest): Promise<CreateActionUseCaseResponse> {
    const existingAction = await this.actionsRepository.findByTitle(title)

    if (existingAction) {
      throw new ActionAlreadyExistsError()
    }

    const action = Action.create({
      title,
      description,
    })

    await this.actionsRepository.create(action)

    return {
      action,
    }
  }
}
