import { Policy } from '../../enterprise/entities/policy'

export interface PoliciesRepository {
  findByTitle(title: string): Promise<Policy | null>
  countByIds(ids: string[]): Promise<number>
  create(policy: Policy): Promise<void>
}
