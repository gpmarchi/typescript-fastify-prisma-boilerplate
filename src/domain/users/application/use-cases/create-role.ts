import { Role } from '../../enterprise/entities/role'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { RolesRepository } from '../repositories/roles-repository'

interface CreateRoleUseCaseRequest {
  title: string
  description: string
  permissions: string[]
}

interface CreateRoleUseCaseResponse {
  role: Role
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({
    title,
    description,
    permissions,
  }: CreateRoleUseCaseRequest): Promise<CreateRoleUseCaseResponse> {
    const existingRole = await this.rolesRepository.findByTitle(title)

    if (existingRole) {
      throw new RoleAlreadyExistsError()
    }

    const role = Role.create({
      title,
      description,
      permissions,
    })

    await this.rolesRepository.create(role)

    return {
      role,
    }
  }
}
