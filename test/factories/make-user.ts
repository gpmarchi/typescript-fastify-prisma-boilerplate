import { faker } from '@faker-js/faker'

import { User, UserProps } from '@/domain/users/enterprise/entities/user'
import { subYears } from 'date-fns'

export function makeUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthDate: subYears(new Date(), 40),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    ...override,
  })

  return user
}
