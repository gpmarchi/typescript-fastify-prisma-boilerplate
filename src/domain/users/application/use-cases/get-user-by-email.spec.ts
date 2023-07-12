import { subYears } from 'date-fns'
import { InMemoryUsersRepository } from 'test/repositories/users/in-memory-users-repository'
import { User } from '../../enterprise/entities/user'
import { GetUserByEmailUseCase } from './get-user-by-email'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByEmailUseCase

describe('Get User By Email', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by email', async () => {
    const newUser = User.create({
      firstName: 'John',
      lastName: 'Doe',
      birthDate: subYears(new Date(), 40),
      email: 'john@example.com',
      phone: '123',
    })

    await inMemoryUsersRepository.create(newUser)

    const { user } = await sut.execute({
      email: 'john@example.com',
    })

    expect(user.id).toBeTruthy()
    expect(user.email).toEqual(newUser.email)
  })

  it('should not be able to get an inexistent user by email', async () => {
    await expect(
      sut.execute({
        email: 'inexistent@user.com',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
