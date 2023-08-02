import { PermissionsRepository } from '@/domain/users/application/repositories/permissions-repository'
import { Permission } from '@/domain/users/enterprise/entities/permission'

export class InMemoryPermissionsRepository implements PermissionsRepository {
  public items: Permission[] = []

  async findByTitle(title: string): Promise<Permission | null> {
    const permission = this.items.find(
      (permission) => permission.title === title,
    )

    if (!permission) {
      return null
    }

    return permission
  }

  async create(permission: Permission): Promise<void> {
    this.items.push(permission)
  }
}
