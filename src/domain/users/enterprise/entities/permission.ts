import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { Slug } from './value-objects/slug'

export interface PermissionProps {
  slug: Slug
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
}

export class Permission extends Entity<PermissionProps> {
  get slug() {
    return this.props.slug
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private update() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.update()
  }

  set description(description: string) {
    this.props.description = description

    this.update()
  }

  static create(
    props: Optional<PermissionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const permission = new Permission(
      {
        ...props,
        slug: Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return permission
  }
}
