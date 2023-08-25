import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makePermission } from 'test/factories/make-permission'
import { InMemoryPermissionsRepository } from 'test/repositories/users/in-memory-permissions-repository'
import { InMemoryRolesRepository } from 'test/repositories/users/in-memory-roles-repository'
import { Role } from '../../enterprise/entities/role'
import { InvalidPermissionError } from '../errors/invalid-permission-error'
import { NoPermissionProvidedError } from '../errors/no-permission-provided-error'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { CreateRoleUseCase } from './create-role'

let inMemoryRolesRepository: InMemoryRolesRepository
let inMemoryPermissionsRepository: InMemoryPermissionsRepository
let sut: CreateRoleUseCase

describe('Create Role', () => {
  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository()

    sut = new CreateRoleUseCase(
      inMemoryRolesRepository,
      inMemoryPermissionsRepository,
    )
  })

  it('should be able to create a role', async () => {
    for (let i = 0; i < 5; i++) {
      await inMemoryPermissionsRepository.create(
        makePermission({}, new UniqueEntityID(`permission-${i + 1}`)),
      )
    }

    const { role } = await sut.execute({
      title: 'Fake role',
      description: 'New fake role',
      permissions: ['permission-1', 'permission-2', 'permission-3'],
    })

    expect(inMemoryRolesRepository.items[0].id.toString()).toEqual(
      role.id.toString(),
    )
    expect(role.title).toEqual('Fake role')
    expect(role.description).toEqual('New fake role')
    expect(role.slug.toString()).toEqual('fake-role')
    expect(role.createdAt).toBeTruthy()
    expect(role.updatedAt).toBeFalsy()
  })

  it('should not be able to create a role that already exists', async () => {
    const role = Role.create({
      title: 'Fake role',
      description: 'New fake role',
      permissions: [new UniqueEntityID('permission-1')],
    })

    await inMemoryRolesRepository.create(role)

    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        permissions: ['permission-1'],
      }),
    ).rejects.toBeInstanceOf(RoleAlreadyExistsError)
  })

  it('should not be able to create a role with no permissions', async () => {
    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        permissions: [],
      }),
    ).rejects.toBeInstanceOf(NoPermissionProvidedError)
  })

  it('should not be able to create a role with invalid permissions', async () => {
    for (let i = 0; i < 5; i++) {
      await inMemoryPermissionsRepository.create(
        makePermission({}, new UniqueEntityID(`permission-${i + 1}`)),
      )
    }

    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        permissions: [
          'permission-1',
          'permission-2',
          'permission-3',
          'permission-10',
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidPermissionError)
  })
})
