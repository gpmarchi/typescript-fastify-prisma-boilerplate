import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { HashProvider } from '@/shared/providers/hash-provider/interfaces/hash-provider'
import { User } from '../../enterprise/entities/user'
import { InvalidRoleError } from '../errors/invalid-role-error'
import { NoRoleProvidedError } from '../errors/no-role-provided-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { RolesRepository } from '../repositories/roles-repository'
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
    private rolesRepository: RolesRepository,
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
    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    if (roles.length === 0) {
      throw new NoRoleProvidedError()
    }

    const validRoles = await this.rolesRepository.countByIds(roles)

    if (validRoles === 0 || validRoles < roles.length) {
      throw new InvalidRoleError()
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = User.create({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      phone,
      roles: roles.map((role) => new UniqueEntityID(role)),
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
