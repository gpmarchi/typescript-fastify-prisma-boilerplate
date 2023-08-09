import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makePolicy } from 'test/factories/make-policy'
import { InMemoryPoliciesRepository } from 'test/repositories/users/in-memory-policies-repository'
import { InMemoryRolesRepository } from 'test/repositories/users/in-memory-roles-repository'
import { Role } from '../../enterprise/entities/role'
import { InvalidPolicyError } from '../errors/invalid-policy-error'
import { NoPolicyProvidedError } from '../errors/no-policy-provided-error'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { CreateRoleUseCase } from './create-role'

let inMemoryRolesRepository: InMemoryRolesRepository
let inMemoryPoliciesRepository: InMemoryPoliciesRepository
let sut: CreateRoleUseCase

describe('Create Role', () => {
  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    inMemoryPoliciesRepository = new InMemoryPoliciesRepository()

    sut = new CreateRoleUseCase(
      inMemoryRolesRepository,
      inMemoryPoliciesRepository,
    )
  })

  it('should be able to create a role', async () => {
    for (let i = 0; i < 5; i++) {
      await inMemoryPoliciesRepository.create(
        makePolicy({}, new UniqueEntityID(`policy-${i + 1}`)),
      )
    }

    const { role } = await sut.execute({
      title: 'Fake role',
      description: 'New fake role',
      policies: ['policy-1', 'policy-2', 'policy-3'],
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
      policies: [new UniqueEntityID('policy-1')],
    })

    await inMemoryRolesRepository.create(role)

    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        policies: ['policy-1'],
      }),
    ).rejects.toBeInstanceOf(RoleAlreadyExistsError)
  })

  it('should not be able to create a role with no policies', async () => {
    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        policies: [],
      }),
    ).rejects.toBeInstanceOf(NoPolicyProvidedError)
  })

  it('should not be able to create a role with invalid policies', async () => {
    for (let i = 0; i < 5; i++) {
      await inMemoryPoliciesRepository.create(
        makePolicy({}, new UniqueEntityID(`policy-${i + 1}`)),
      )
    }

    await expect(
      sut.execute({
        title: 'Fake role',
        description: 'New fake role',
        policies: ['policy-1', 'policy-2', 'policy-3', 'policy-10'],
      }),
    ).rejects.toBeInstanceOf(InvalidPolicyError)
  })
})
