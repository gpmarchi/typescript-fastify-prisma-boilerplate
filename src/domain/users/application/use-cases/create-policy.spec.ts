import { InMemoryPoliciesRepository } from 'test/repositories/users/in-memory-policies-repository'
import { Policy } from '../../enterprise/entities/policy'
import { PolicyAlreadyExistsError } from '../errors/policy-already-exists-error'
import { CreatePolicyUseCase } from './create-policy'

let inMemoryPoliciesRepository: InMemoryPoliciesRepository
let sut: CreatePolicyUseCase

describe('Create Policy', () => {
  beforeEach(() => {
    inMemoryPoliciesRepository = new InMemoryPoliciesRepository()

    sut = new CreatePolicyUseCase(inMemoryPoliciesRepository)
  })

  it('should be able to create a policy', async () => {
    const { policy } = await sut.execute({
      title: 'Fake policy',
      description: 'New fake policy',
    })

    expect(inMemoryPoliciesRepository.items[0].id.toString()).toEqual(
      policy.id.toString(),
    )
    expect(policy.title).toEqual('Fake policy')
    expect(policy.description).toEqual('New fake policy')
    expect(policy.createdAt).toBeTruthy()
    expect(policy.updatedAt).toBeFalsy()
  })

  it('should not be able to create a policy that already exists', async () => {
    const policy = Policy.create({
      title: 'Fake policy',
      description: 'New fake policy',
    })

    await inMemoryPoliciesRepository.create(policy)

    await expect(
      sut.execute({
        title: 'Fake policy',
        description: 'New fake policy',
      }),
    ).rejects.toBeInstanceOf(PolicyAlreadyExistsError)
  })
})
