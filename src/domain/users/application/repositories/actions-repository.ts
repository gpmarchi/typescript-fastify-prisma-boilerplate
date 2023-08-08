import { Action } from '../../enterprise/entities/action'

export interface ActionsRepository {
  findByTitle(title: string): Promise<Action | null>
  create(action: Action): Promise<void>
}
