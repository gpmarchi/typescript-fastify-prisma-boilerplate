import { faker } from '@faker-js/faker'

import {
  Permission,
  PermissionProps,
} from '@/domain/users/enterprise/entities/permission'

export function makePermission(override: Partial<PermissionProps> = {}) {
  const permission = Permission.create({
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    ...override,
  })

  return permission
}
