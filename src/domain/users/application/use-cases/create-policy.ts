import { Policy } from '../../enterprise/entities/policy'
import { PolicyAlreadyExistsError } from '../errors/policy-already-exists-error'
import { PoliciesRepository } from '../repositories/policies-repository'

interface CreatePolicyUseCaseRequest {
  title: string
  description: string
}

interface CreatePolicyUseCaseResponse {
  policy: Policy
}

export class CreatePolicyUseCase {
  constructor(private policiesRepository: PoliciesRepository) {}

  async execute({
    title,
    description,
  }: CreatePolicyUseCaseRequest): Promise<CreatePolicyUseCaseResponse> {
    const existingPolicy = await this.policiesRepository.findByTitle(title)

    if (existingPolicy) {
      throw new PolicyAlreadyExistsError()
    }

    const policy = Policy.create({
      title,
      description,
    })

    await this.policiesRepository.create(policy)

    return {
      policy,
    }
  }
}
