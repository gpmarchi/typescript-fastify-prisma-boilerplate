import { InMemoryResourcesRepository } from 'test/repositories/users/in-memory-resources-repository'
import { Resource } from '../../enterprise/entities/resource'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { CreateResourceUseCase } from './create-resource'

let inMemoryResourcesRepository: InMemoryResourcesRepository
let sut: CreateResourceUseCase

describe('Create Resource', () => {
  beforeEach(() => {
    inMemoryResourcesRepository = new InMemoryResourcesRepository()

    sut = new CreateResourceUseCase(inMemoryResourcesRepository)
  })

  it('should be able to create a resource', async () => {
    const { resource } = await sut.execute({
      title: 'Fake resource',
      description: 'New fake resource',
      endpoint: '/fake-resource/*',
    })

    expect(inMemoryResourcesRepository.items[0].id.toString()).toEqual(
      resource.id.toString(),
    )
    expect(resource.title).toEqual('Fake resource')
    expect(resource.description).toEqual('New fake resource')
    expect(resource.endpoint).toEqual('/fake-resource/*')
    expect(resource.createdAt).toBeTruthy()
    expect(resource.updatedAt).toBeFalsy()
  })

  it('should not be able to create a resource that already exists', async () => {
    const resource = Resource.create({
      title: 'Fake resource',
      description: 'New fake resource',
      endpoint: '/fake-resource/*',
    })

    await inMemoryResourcesRepository.create(resource)

    await expect(
      sut.execute({
        title: 'Fake resource',
        description: 'New fake resource',
        endpoint: '/fake-resource/*',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
