import { expect, test } from 'vitest'
import { CreateUserUseCase } from './create-user'

test('create an user', () => {
  const createUser = new CreateUserUseCase()

  const user = createUser.execute({
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    email: 'john@example.com',
    phone: '123',
  })

  expect(user.firstName).toEqual('John')
})
