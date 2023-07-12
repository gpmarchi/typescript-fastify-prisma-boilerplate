import { Permission } from '../../enterprise/entities/permission'

export interface PermissionsRepository {
  create(permission: Permission): Promise<void>
}
