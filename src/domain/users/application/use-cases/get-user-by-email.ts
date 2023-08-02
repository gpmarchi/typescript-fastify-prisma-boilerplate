import { User } from '../../enterprise/entities/user'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UsersRepository } from '../repositories/users-repository'

interface GetUserByEmailUseCaseRequest {
  email: string
}

interface GetUserByEmailUseCaseResponse {
  user: User
}

export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user,
    }
  }
}
