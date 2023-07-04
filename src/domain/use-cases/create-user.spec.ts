import { UsersRepository } from '@/repositories/users-repository'
import { User } from '../entities/user'
import { CreateUserUseCase } from './create-user'

const fakeUsersRepository: UsersRepository = {
  create: async (user: User) => {},
}

test('create an user', async () => {
  const createUser = new CreateUserUseCase(fakeUsersRepository)

  const user = await createUser.execute({
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    email: 'john@example.com',
    phone: '123',
  })

  expect(user.firstName).toEqual('John')
})
