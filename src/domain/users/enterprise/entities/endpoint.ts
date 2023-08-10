import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface EndpointProps {
  title: string
  description: string
  uri: string
  createdAt: Date
  updatedAt?: Date
}

export class Endpoint extends Entity<EndpointProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get uri() {
    return this.props.uri
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

  set uri(uri: string) {
    this.props.uri = uri

    this.update()
  }

  static create(
    props: Optional<EndpointProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const endpoint = new Endpoint(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return endpoint
  }
}
