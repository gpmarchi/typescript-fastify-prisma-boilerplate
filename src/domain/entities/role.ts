import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { Slug } from './value-objects/slug'

interface RoleProps {
  slug: Slug
  title: string
  description: string
  permissions?: string[]
  createdAt: Date
  updatedAt?: Date
}

export class Role extends Entity<RoleProps> {
  static create(props: Optional<RoleProps, 'createdAt'>, id?: UniqueEntityID) {
    const role = new Role(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return role
  }
}
