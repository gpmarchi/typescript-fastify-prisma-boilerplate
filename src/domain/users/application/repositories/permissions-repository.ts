import { Permission } from '../../enterprise/entities/permission'

export interface PermissionsRepository {
  findByTitle(title: string): Promise<Permission | null>
  create(permission: Permission): Promise<void>
}
