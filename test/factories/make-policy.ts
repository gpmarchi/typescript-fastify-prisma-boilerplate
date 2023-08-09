import { faker } from '@faker-js/faker'

import { Policy, PolicyProps } from '@/domain/users/enterprise/entities/policy'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makePolicy(
  override: Partial<PolicyProps> = {},
  id?: UniqueEntityID,
) {
  const policy = Policy.create(
    {
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return policy
}
