import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Role } from '../../enterprise/entities/role'
import { InvalidPermissionError } from '../errors/invalid-permission-error'
import { NoPermissionProvidedError } from '../errors/no-permission-provided-error'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { PermissionsRepository } from '../repositories/permissions-repository'
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
  constructor(
    private rolesRepository: RolesRepository,
    private permissionsRepository: PermissionsRepository,
  ) {}

  async execute({
    title,
    description,
    permissions: policies,
  }: CreateRoleUseCaseRequest): Promise<CreateRoleUseCaseResponse> {
    const existingRole = await this.rolesRepository.findByTitle(title)

    if (existingRole) {
      throw new RoleAlreadyExistsError()
    }

    if (policies.length === 0) {
      throw new NoPermissionProvidedError()
    }

    const validPolicies = await this.permissionsRepository.countByIds(policies)

    if (validPolicies === 0 || validPolicies < policies.length) {
      throw new InvalidPermissionError()
    }

    const role = Role.create({
      title,
      description,
      permissions: policies.map((policy) => new UniqueEntityID(policy)),
    })

    await this.rolesRepository.create(role)

    return {
      role,
    }
  }
}
