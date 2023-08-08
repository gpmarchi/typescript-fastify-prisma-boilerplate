import { Policy } from '../../enterprise/entities/policy'

export interface PoliciesRepository {
  findByTitle(title: string): Promise<Policy | null>
  create(policy: Policy): Promise<void>
}
