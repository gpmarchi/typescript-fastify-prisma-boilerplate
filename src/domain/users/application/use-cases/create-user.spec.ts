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
    vi.useFakeTimers()

    const currentDate = new Date(2023, 5, 12)
    vi.setSystemTime(currentDate)

    const birthDate = new Date(1980, 5, 11)

    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      birthDate,
      email: 'john@example.com',
      phone: '123',
    })

    expect(user.firstName).toEqual('John')
    expect(user.lastName).toEqual('Doe')
    expect(user.fullName).toEqual('John Doe')
    expect(user.birthDate).toEqual(birthDate)
    expect(user.age).toEqual(43)
    expect(user.email).toEqual('john@example.com')
    expect(user.phone).toEqual('123')
    expect(user.roles).toBe(undefined)
    expect(user.permissions).toBe(undefined)
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBe(undefined)
    expect(inMemoryUsersRepository.items[0].id).toEqual(user.id)

    vi.useRealTimers()
  })
})
