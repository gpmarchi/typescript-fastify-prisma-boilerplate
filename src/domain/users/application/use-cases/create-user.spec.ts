import { subYears } from 'date-fns'
import { InMemoryUsersRepository } from 'test/repositories/users/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create an user', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      birthDate: subYears(new Date(), 40),
      email: 'john@example.com',
      phone: '123',
    })

    expect(user.firstName).toEqual('John')
    expect(inMemoryUsersRepository.items[0].id).toEqual(user.id)
  })
})
