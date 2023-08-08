import { Role } from '../../enterprise/entities/role'

export interface RolesRepository {
  findByTitle(title: string): Promise<Role | null>
  create(role: Role): Promise<void>
}
