import { PoliciesRepository } from '@/domain/users/application/repositories/policies-repository'
import { Policy } from '@/domain/users/enterprise/entities/policy'

export class InMemoryPoliciesRepository implements PoliciesRepository {
  public items: Policy[] = []

  async findByTitle(title: string): Promise<Policy | null> {
    const policy = this.items.find((policy) => policy.title === title)

    if (!policy) {
      return null
    }

    return policy
  }

  async create(policy: Policy): Promise<void> {
    this.items.push(policy)
  }
}
