import 'reflect-metadata'

import { InMemoryEndpointsRepository } from 'test/repositories/users/in-memory-endpoints-repository'
import { Endpoint } from '../../enterprise/entities/endpoint'
import { EndpointAlreadyExistsError } from '../errors/endpoint-already-exists-error'
import { CreateEndpointUseCase } from './create-endpoint'

let inMemoryEndpointsRepository: InMemoryEndpointsRepository
let sut: CreateEndpointUseCase

describe('Create Endpoint', () => {
  beforeEach(() => {
    inMemoryEndpointsRepository = new InMemoryEndpointsRepository()

    sut = new CreateEndpointUseCase(inMemoryEndpointsRepository)
  })

  it('should be able to create a endpoint', async () => {
    const { endpoint } = await sut.execute({
      title: 'Fake endpoint',
      description: 'New fake endpoint',
      uri: '/fake-endpoint/*',
    })

    expect(inMemoryEndpointsRepository.items[0].id.toString()).toEqual(
      endpoint.id.toString(),
    )
    expect(endpoint.title).toEqual('Fake endpoint')
    expect(endpoint.description).toEqual('New fake endpoint')
    expect(endpoint.uri).toEqual('/fake-endpoint/*')
    expect(endpoint.createdAt).toBeTruthy()
    expect(endpoint.updatedAt).toBeFalsy()
  })

  it('should not be able to create a endpoint that already exists', async () => {
    const endpoint = Endpoint.create({
      title: 'Fake endpoint',
      description: 'New fake endpoint',
      uri: '/fake-endpoint/*',
    })

    await inMemoryEndpointsRepository.create(endpoint)

    await expect(
      sut.execute({
        title: 'Fake endpoint',
        description: 'New fake endpoint',
        uri: '/fake-endpoint/*',
      }),
    ).rejects.toBeInstanceOf(EndpointAlreadyExistsError)
  })
})
