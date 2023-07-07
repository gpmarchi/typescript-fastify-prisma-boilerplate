import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'

interface UserProps {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  roles?: string[]
  permissions?: string[]
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
