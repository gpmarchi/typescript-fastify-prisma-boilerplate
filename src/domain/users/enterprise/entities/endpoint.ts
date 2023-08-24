import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { HttpMethod } from '../enums/http-method'

export interface EndpointProps {
  title: string
  description: string
  httpMethod: HttpMethod
  uri: string
  createdAt: Date
  updatedAt?: Date
}

export class Endpoint extends Entity<EndpointProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title

    this.update()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description

    this.update()
  }

  get httpMethod() {
    return this.props.httpMethod
  }

  set httpMethod(httpMethod: HttpMethod) {
    this.props.httpMethod = httpMethod

    this.update()
  }

  get uri() {
    return this.props.uri
  }

  set uri(uri: string) {
    this.props.uri = uri

    this.update()
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
