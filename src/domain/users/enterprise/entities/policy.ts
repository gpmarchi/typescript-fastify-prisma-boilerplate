import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface PolicyProps {
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
}

export class Policy extends Entity<PolicyProps> {
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

    this.update()
  }

  set description(description: string) {
    this.props.description = description

    this.update()
  }

  static create(
    props: Optional<PolicyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const policy = new Policy(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return policy
  }
}