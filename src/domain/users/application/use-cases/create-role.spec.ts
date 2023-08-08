import { InMemoryRolesRepository } from 'test/repositories/users/in-memory-roles-repository'
import { Role } from '../../enterprise/entities/role'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { CreateRoleUseCase } from './create-role'

let inMemoryRolesRepository: InMemoryRolesRepository
let sut: CreateRoleUseCase

describe('Create Role', () => {
  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()

    sut = new CreateRoleUseCase(inMemoryRolesRepository)
  })

  it('should be able to create a role', async () => {
    const { role } = await sut.execute({
      title: 'Fake role',
      description: 'New fake role',
    })

    expect(inMemoryRolesRepository.items[0].id.toString()).toEqual(
      role.id.toString(),
    )
    expect(role.title).toEqual('Fake role')
    expect(role.description).toEqual('New fake role')
    expect(role.slug.value).toEqual('fake-role')
    expect(role.createdAt).toBeTruthy()
    expect(role.updatedAt).toBeFalsy()
  })

  it('should not be able to create a role that already exists', async () => {
    const role = Role.create({
      title: 'Fake role',
      description: 'New fake role',
    })

    await inMemoryRolesRepository.create(role)

    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
      }),
    ).rejects.toBeInstanceOf(RoleAlreadyExistsError)
  })
})
