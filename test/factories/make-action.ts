import { faker } from '@faker-js/faker'

import { Action, ActionProps } from '@/domain/users/enterprise/entities/action'

export function makeAction(override: Partial<ActionProps> = {}) {
  const action = Action.create({
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    ...override,
  })

  return action
}
