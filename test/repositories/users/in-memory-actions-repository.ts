import { ActionsRepository } from '@/domain/users/application/repositories/actions-repository'
import { Action } from '@/domain/users/enterprise/entities/action'

export class InMemoryActionsRepository implements ActionsRepository {
  public items: Action[] = []

  async findByTitle(title: string): Promise<Action | null> {
    const action = this.items.find((action) => action.title === title)

    if (!action) {
      return null
    }

    return action
  }

  async create(action: Action): Promise<void> {
    this.items.push(action)
  }
}
