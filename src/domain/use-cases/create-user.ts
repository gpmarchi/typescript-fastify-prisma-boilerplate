import { User } from '../entities/user'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  roles?: string[]
  permissions?: string[]
}

export class CreateUserUseCase {
  execute({
    firstName,
    lastName,
    age,
    email,
    phone,
    roles,
    permissions,
  }: CreateUserUseCaseRequest) {
    const user = new User({
      firstName,
      lastName,
      age,
      email,
      phone,
      roles,
      permissions,
    })

    return user
  }
}
