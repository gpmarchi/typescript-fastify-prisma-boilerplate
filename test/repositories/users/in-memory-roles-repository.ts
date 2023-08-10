import { RolesRepository } from '@/domain/users/application/repositories/roles-repository'
import { Role } from '@/domain/users/enterprise/entities/role'

export class InMemoryRolesRepository implements RolesRepository {
  public items: Role[] = []

  async findByTitle(title: string): Promise<Role | null> {
    const role = this.items.find((role) => role.title === title)

    if (!role) {
      return null
    }

    return role
  }

  async countByIds(ids: string[]): Promise<number> {
    const count = this.items.filter((item) =>
      ids.includes(item.id.toString()),
    ).length

    return count
  }

  async create(role: Role): Promise<void> {
    this.items.push(role)
  }
}
