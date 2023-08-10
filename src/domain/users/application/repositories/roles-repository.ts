import { Role } from '../../enterprise/entities/role'

export interface RolesRepository {
  findByTitle(title: string): Promise<Role | null>
  countByIds(ids: string[]): Promise<number>
  create(role: Role): Promise<void>
}
