import { randomUUID } from 'node:crypto'

export class User {
  public id: string
  public firstName: string
  public lastName: string
  public age: number
  public email: string
  public phone: string

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    phone: string,
    id?: string,
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.email = email
    this.phone = phone
    this.id = id ?? randomUUID()
  }
}
