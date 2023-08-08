import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface ResourceProps {
  title: string
  description: string
  endpoint: string
  createdAt: Date
  updatedAt?: Date
}

export class Resource extends Entity<ResourceProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get endpoint() {
    return this.props.endpoint
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

  set endpoint(endpoint: string) {
    this.props.endpoint = endpoint

    this.update()
  }

  static create(
    props: Optional<ResourceProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const resource = new Resource(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return resource
  }
}
