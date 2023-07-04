import { Entity } from '@/shared/entities/entity'

interface UserProps {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  roles?: string[]
  permissions?: string[]
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }
}
