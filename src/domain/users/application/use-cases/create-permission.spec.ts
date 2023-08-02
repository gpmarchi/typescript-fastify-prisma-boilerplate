import { InMemoryPermissionsRepository } from 'test/repositories/users/in-memory-permissions-repository'
import { Permission } from '../../enterprise/entities/permission'
import { PermissionAlreadyExistsError } from '../errors/permission-already-exists-error'
import { CreatePermissionUseCase } from './create-permission'

let inMemoryPermissionsRepository: InMemoryPermissionsRepository
let sut: CreatePermissionUseCase

describe('Create Permission', () => {
  beforeEach(() => {
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository()

    sut = new CreatePermissionUseCase(inMemoryPermissionsRepository)
  })

  it('should be able to create a permission', async () => {
    const { permission } = await sut.execute({
      title: 'Fake permission',
      description: 'New fake permission',
    })

    expect(inMemoryPermissionsRepository.items[0].id.toString()).toEqual(
      permission.id.toString(),
    )
    expect(permission.title).toEqual('Fake permission')
    expect(permission.description).toEqual('New fake permission')
    expect(permission.slug.value).toEqual('fake-permission')
    expect(permission.createdAt).toBeTruthy()
    expect(permission.updatedAt).toBeFalsy()
  })

  it('should not be able to create a permission that already exists', async () => {
    const permission = Permission.create({
      title: 'Fake permission',
      description: 'New fake permission',
    })

    await inMemoryPermissionsRepository.create(permission)

    await expect(
      sut.execute({
        title: 'Fake permission',
        description: 'New fake permission',
      }),
    ).rejects.toBeInstanceOf(PermissionAlreadyExistsError)
  })
})
