import { User } from '../entities/user'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
}

export class CreateUserUseCase {
  execute({
    firstName,
    lastName,
    age,
    email,
    phone,
  }: CreateUserUseCaseRequest) {
    const user = new User(firstName, lastName, age, email, phone)

    return user
  }
}
