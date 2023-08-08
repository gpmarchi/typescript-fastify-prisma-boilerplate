import { ResourcesRepository } from '@/domain/users/application/repositories/resources-repository'
import { Resource } from '@/domain/users/enterprise/entities/resource'

export class InMemoryResourcesRepository implements ResourcesRepository {
  public items: Resource[] = []

  async findByTitle(title: string): Promise<Resource | null> {
    const resource = this.items.find((resource) => resource.title === title)

    if (!resource) {
      return null
    }

    return resource
  }

  async create(resource: Resource): Promise<void> {
    this.items.push(resource)
  }
}
