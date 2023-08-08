import { HashProvider } from '@/shared/providers/hash-provider/interfaces/hash-provider'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  password: string
  phone: string
  roles: string[]
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute({
    firstName,
    lastName,
    birthDate,
    email,
    password,
    phone,
    roles,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = User.create({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      phone,
      roles,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
