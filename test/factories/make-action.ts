import { faker } from '@faker-js/faker'

import { Action, ActionProps } from '@/domain/users/enterprise/entities/action'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makeAction(override: Partial<ActionProps> = {}) {
  const action = Action.create({
    resourceId: new UniqueEntityID(),
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    ...override,
  })

  return action
}
