import { faker } from '@faker-js/faker'

import { Action, ActionProps } from '@/domain/users/enterprise/entities/action'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makeAction(
  override: Partial<ActionProps> = {},
  id?: UniqueEntityID,
) {
  const action = Action.create(
    {
      endpointId: new UniqueEntityID(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return action
}
