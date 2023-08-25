import { Permission } from '../../enterprise/entities/permission'

export interface PermissionsRepository {
  findByTitle(title: string): Promise<Permission | null>
  findByEndpointId(endpointId: string): Promise<Permission | null>
  countByIds(ids: string[]): Promise<number>
  create(permission: Permission): Promise<void>
}
