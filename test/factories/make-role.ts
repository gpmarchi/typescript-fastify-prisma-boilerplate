import { faker } from '@faker-js/faker'

import { Role, RoleProps } from '@/domain/users/enterprise/entities/role'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makeRole(
  override: Partial<RoleProps> = {},
  id?: UniqueEntityID,
) {
  const role = Role.create(
    {
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      permissions: [],
      ...override,
    },
    id,
  )

  return role
}
