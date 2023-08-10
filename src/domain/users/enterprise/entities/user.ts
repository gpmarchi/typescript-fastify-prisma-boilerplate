import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { differenceInYears } from 'date-fns'

export interface UserProps {
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  password: string
  phone: string
  roles: UniqueEntityID[]
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get fullName() {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  get birthDate() {
    return this.props.birthDate
  }

  get age() {
    return differenceInYears(new Date(), this.props.birthDate)
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
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

  set firstName(firstName: string) {
    this.props.firstName = firstName

    this.update()
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName

    this.update()
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate

    this.update()
  }

  set email(email: string) {
    this.props.email = email

    this.update()
  }

  set password(password: string) {
    this.props.password = password

    this.update()
  }

  set phone(phone: string) {
    this.props.phone = phone

    this.update()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
