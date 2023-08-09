import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makeResource } from 'test/factories/make-resource'
import { InMemoryActionsRepository } from 'test/repositories/users/in-memory-actions-repository'
import { InMemoryResourcesRepository } from 'test/repositories/users/in-memory-resources-repository'
import { Action } from '../../enterprise/entities/action'
import { ActionAlreadyExistsError } from '../errors/action-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateActionUseCase } from './create-action'

let inMemoryActionsRepository: InMemoryActionsRepository
let inMemoryResourcesRepository: InMemoryResourcesRepository
let sut: CreateActionUseCase

describe('Create Action', () => {
  beforeEach(() => {
    inMemoryActionsRepository = new InMemoryActionsRepository()
    inMemoryResourcesRepository = new InMemoryResourcesRepository()

    sut = new CreateActionUseCase(
      inMemoryActionsRepository,
      inMemoryResourcesRepository,
    )
  })

  it('should be able to create an action', async () => {
    await inMemoryResourcesRepository.create(
      makeResource({}, new UniqueEntityID('resource-1')),
    )

    const { action } = await sut.execute({
      resourceId: 'resource-1',
      title: 'Fake action',
      description: 'New fake action',
    })

    expect(inMemoryActionsRepository.items[0].id.toString()).toEqual(
      action.id.toString(),
    )
    expect(action.resourceId.toString()).toEqual('resource-1')
    expect(action.title).toEqual('Fake action')
    expect(action.description).toEqual('New fake action')
    expect(action.slug.value).toEqual('fake-action')
    expect(action.createdAt).toBeTruthy()
    expect(action.updatedAt).toBeFalsy()
  })

  it('should not be able to create an action that already exists', async () => {
    const action = Action.create({
      resourceId: new UniqueEntityID('resource-1'),
      title: 'Fake action',
      description: 'New fake action',
    })

    await inMemoryActionsRepository.create(action)

    await expect(
      sut.execute({
        resourceId: 'resource-1',
        title: 'Fake action',
        description: 'New fake action',
      }),
    ).rejects.toBeInstanceOf(ActionAlreadyExistsError)
  })

  it('should not be able to create an action with inexistent resource', async () => {
    await expect(
      sut.execute({
        resourceId: 'resource-1',
        title: 'Fake action',
        description: 'New fake action',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
