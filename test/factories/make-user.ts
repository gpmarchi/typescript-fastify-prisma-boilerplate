import { User, UserProps } from '@/domain/users/enterprise/entities/user'
import { subYears } from 'date-fns'

export function makeUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: subYears(new Date(), 40),
    email: 'john@example.com',
    password: '123456',
    phone: '123',
    ...override,
  })

  return user
}
