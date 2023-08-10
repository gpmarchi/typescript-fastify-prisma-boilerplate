import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makeRole } from 'test/factories/make-role'
import { FakeHashProvider } from 'test/providers/fake-hash-provider'
import { InMemoryRolesRepository } from 'test/repositories/users/in-memory-roles-repository'
import { InMemoryUsersRepository } from 'test/repositories/users/in-memory-users-repository'
import { InvalidRoleError } from '../errors/invalid-role-error'
import { NoRoleProvidedError } from '../errors/no-role-provided-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { CreateUserUseCase } from './create-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryRolesRepository: InMemoryRolesRepository
let fakeHashProvider: FakeHashProvider
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryRolesRepository = new InMemoryRolesRepository()
    fakeHashProvider = new FakeHashProvider()

    sut = new CreateUserUseCase(
      inMemoryUsersRepository,
      inMemoryRolesRepository,
      fakeHashProvider,
    )
  })

  it('should be able to create an user', async () => {
    vi.useFakeTimers()

    const currentDate = new Date(2023, 5, 12)
    vi.setSystemTime(currentDate)

    const birthDate = new Date(1980, 5, 11)

    const role = makeRole({}, new UniqueEntityID('role-1'))

    await inMemoryRolesRepository.create(role)

    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      birthDate,
      email: 'john@example.com',
      password: '123456',
      phone: '123',
      roles: [role.id.toString()],
    })

    expect(user.firstName).toEqual('John')
    expect(user.lastName).toEqual('Doe')
    expect(user.fullName).toEqual('John Doe')
    expect(user.birthDate).toEqual(birthDate)
    expect(user.age).toEqual(43)
    expect(user.email).toEqual('john@example.com')
    expect(user.password).toBeTruthy()
    expect(user.phone).toEqual('123')
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBe(undefined)
    expect(inMemoryUsersRepository.items[0].id.toString()).toEqual(
      user.id.toString(),
    )

    vi.useRealTimers()
  })

  it('should not be able to create an user with the same email', async () => {
    const role = makeRole({}, new UniqueEntityID('role-1'))

    await inMemoryRolesRepository.create(role)

    await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date(),
      email: 'john@example.com',
      password: '123456',
      phone: '123',
      roles: [role.id.toString()],
    })

    await expect(
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date(),
        email: 'john@example.com',
        password: '123456',
        phone: '123',
        roles: [role.id.toString()],
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to create an user with no roles', async () => {
    await expect(
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date(),
        email: 'john@example.com',
        password: '123456',
        phone: '123',
        roles: [],
      }),
    ).rejects.toBeInstanceOf(NoRoleProvidedError)
  })

  it('should not be able to create an user with inexistent roles', async () => {
    await expect(
      sut.execute({
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date(),
        email: 'john@example.com',
        password: '123456',
        phone: '123',
        roles: ['invalid-role'],
      }),
    ).rejects.toBeInstanceOf(InvalidRoleError)
  })
})
