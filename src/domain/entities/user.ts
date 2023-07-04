import { randomUUID } from 'node:crypto'

interface UserProps {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  roles?: string[]
  permissions?: string[]
}

export class User {
  public id: string
  public firstName: string
  public lastName: string
  public age: number
  public email: string
  public phone: string
  public roles: string[]
  public permissions: string[]

  constructor(props: UserProps, id?: string) {
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.age = props.age
    this.email = props.email
    this.phone = props.phone
    this.roles = props.roles ?? []
    this.permissions = props.permissions ?? []
    this.id = id ?? randomUUID()
  }
}
