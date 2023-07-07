import { UsersRepository } from '@/repositories/users-repository'
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
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    age,
    email,
    phone,
    roles,
    permissions,
  }: CreateUserUseCaseRequest) {
    const user = User.create({
      firstName,
      lastName,
      age,
      email,
      phone,
      roles,
      permissions,
    })

    await this.usersRepository.create(user)

    return user
  }
}
