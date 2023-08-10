import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { makeEndpoint } from 'test/factories/make-endpoint'
import { InMemoryActionsRepository } from 'test/repositories/users/in-memory-actions-repository'
import { InMemoryEndpointsRepository } from 'test/repositories/users/in-memory-endpoints-repository'
import { Action } from '../../enterprise/entities/action'
import { ActionAlreadyExistsError } from '../errors/action-already-exists-error'
import { EndpointNotFoundError } from '../errors/endpoint-not-found-error'
import { CreateActionUseCase } from './create-action'

let inMemoryActionsRepository: InMemoryActionsRepository
let inMemoryEndpointsRepository: InMemoryEndpointsRepository
let sut: CreateActionUseCase

describe('Create Action', () => {
  beforeEach(() => {
    inMemoryActionsRepository = new InMemoryActionsRepository()
    inMemoryEndpointsRepository = new InMemoryEndpointsRepository()

    sut = new CreateActionUseCase(
      inMemoryActionsRepository,
      inMemoryEndpointsRepository,
    )
  })

  it('should be able to create an action', async () => {
    await inMemoryEndpointsRepository.create(
      makeEndpoint({}, new UniqueEntityID('endpoint-1')),
    )

    const { action } = await sut.execute({
      endpointId: 'endpoint-1',
      title: 'Fake action',
      description: 'New fake action',
    })

    expect(inMemoryActionsRepository.items[0].id.toString()).toEqual(
      action.id.toString(),
    )
    expect(action.endpointId.toString()).toEqual('endpoint-1')
    expect(action.title).toEqual('Fake action')
    expect(action.description).toEqual('New fake action')
    expect(action.slug.value).toEqual('fake-action')
    expect(action.createdAt).toBeTruthy()
    expect(action.updatedAt).toBeFalsy()
  })

  it('should not be able to create an action that already exists', async () => {
    const action = Action.create({
      endpointId: new UniqueEntityID('endpoint-1'),
      title: 'Fake action',
      description: 'New fake action',
    })

    await inMemoryActionsRepository.create(action)

    await expect(
      sut.execute({
        endpointId: 'endpoint-1',
        title: 'Fake action',
        description: 'New fake action',
      }),
    ).rejects.toBeInstanceOf(ActionAlreadyExistsError)
  })

  it('should not be able to create an action with inexistent endpoint', async () => {
    await expect(
      sut.execute({
        endpointId: 'endpoint-1',
        title: 'Fake action',
        description: 'New fake action',
      }),
    ).rejects.toBeInstanceOf(EndpointNotFoundError)
  })
})
