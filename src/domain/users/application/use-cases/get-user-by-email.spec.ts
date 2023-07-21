import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/users/in-memory-users-repository'
import { GetUserByEmailUseCase } from './get-user-by-email'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByEmailUseCase

describe('Get User By Email', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by email', async () => {
    const newUser = makeUser({
      email: 'test@example.com',
    })

    await inMemoryUsersRepository.create(newUser)

    const { user } = await sut.execute({
      email: 'test@example.com',
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
