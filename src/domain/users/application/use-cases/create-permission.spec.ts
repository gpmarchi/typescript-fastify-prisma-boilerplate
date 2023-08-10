import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makeEndpoint } from 'test/factories/make-endpoint'
import { InMemoryEndpointsRepository } from 'test/repositories/users/in-memory-endpoints-repository'
import { InMemoryPermissionsRepository } from 'test/repositories/users/in-memory-permissions-repository'
import { Permission } from '../../enterprise/entities/permission'
import { EndpointNotFoundError } from '../errors/endpoint-not-found-error'
import { PermissionAlreadyExistsError } from '../errors/permission-already-exists-error'
import { CreatePermissionUseCase } from './create-permission'

let inMemoryPermissionsRepository: InMemoryPermissionsRepository
let inMemoryEndpointsRepository: InMemoryEndpointsRepository
let sut: CreatePermissionUseCase

describe('Create Permission', () => {
  beforeEach(() => {
    inMemoryPermissionsRepository = new InMemoryPermissionsRepository()
    inMemoryEndpointsRepository = new InMemoryEndpointsRepository()

    sut = new CreatePermissionUseCase(
      inMemoryPermissionsRepository,
      inMemoryEndpointsRepository,
    )
  })

  it('should be able to create an permission', async () => {
    await inMemoryEndpointsRepository.create(
      makeEndpoint({}, new UniqueEntityID('endpoint-1')),
    )

    const { permission } = await sut.execute({
      endpointId: 'endpoint-1',
      title: 'Fake permission',
      description: 'New fake permission',
    })

    expect(inMemoryPermissionsRepository.items[0].id.toString()).toEqual(
      permission.id.toString(),
    )
    expect(permission.endpointId.toString()).toEqual('endpoint-1')
    expect(permission.title).toEqual('Fake permission')
    expect(permission.description).toEqual('New fake permission')
    expect(permission.slug.value).toEqual('fake-permission')
    expect(permission.createdAt).toBeTruthy()
    expect(permission.updatedAt).toBeFalsy()
  })

  it('should not be able to create an permission that already exists', async () => {
    const permission = Permission.create({
      endpointId: new UniqueEntityID('endpoint-1'),
      title: 'Fake permission',
      description: 'New fake permission',
    })

    await inMemoryPermissionsRepository.create(permission)

    await expect(
      sut.execute({
        endpointId: 'endpoint-1',
        title: 'Fake permission',
        description: 'New fake permission',
      }),
    ).rejects.toBeInstanceOf(PermissionAlreadyExistsError)
  })

  it('should not be able to create an permission with inexistent endpoint', async () => {
    await expect(
      sut.execute({
        endpointId: 'endpoint-1',
        title: 'Fake permission',
        description: 'New fake permission',
      }),
    ).rejects.toBeInstanceOf(EndpointNotFoundError)
  })
})
