import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { Slug } from './value-objects/slug'

interface PermissionProps {
  slug: Slug
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
}

export class Permission extends Entity<PermissionProps> {
  static create(
    props: Optional<PermissionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const permission = new Permission(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return permission
  }
}
