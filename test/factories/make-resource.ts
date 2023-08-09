import { faker } from '@faker-js/faker'

import {
  Resource,
  ResourceProps,
} from '@/domain/users/enterprise/entities/resource'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makeResource(
  override: Partial<ResourceProps> = {},
  id?: UniqueEntityID,
) {
  const resource = Resource.create(
    {
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      endpoint: faker.internet.url(),
      ...override,
    },
    id,
  )

  return resource
}
