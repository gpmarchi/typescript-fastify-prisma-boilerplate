import { faker } from '@faker-js/faker'

import {
  Permission,
  PermissionProps,
} from '@/domain/users/enterprise/entities/permission'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makePermission(
  override: Partial<PermissionProps> = {},
  id?: UniqueEntityID,
) {
  const permission = Permission.create(
    {
      endpointId: new UniqueEntityID(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return permission
}
