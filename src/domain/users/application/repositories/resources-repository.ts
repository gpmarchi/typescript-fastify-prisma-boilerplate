import { Resource } from '../../enterprise/entities/resource'

export interface ResourcesRepository {
  findByTitle(title: string): Promise<Resource | null>
  create(resource: Resource): Promise<void>
}
