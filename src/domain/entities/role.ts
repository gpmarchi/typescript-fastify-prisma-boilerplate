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
  get slug() {
    return this.props.slug
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get permissions(): string[] | undefined {
    return this.props.permissions
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

  set permissions(permissions: string[]) {
    this.props.permissions = permissions

    this.update()
  }

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
