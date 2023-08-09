import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Role } from '../../enterprise/entities/role'
import { InvalidPolicyError } from '../errors/invalid-policy-error'
import { NoPolicyProvidedError } from '../errors/no-policy-provided-error'
import { RoleAlreadyExistsError } from '../errors/role-already-exists-error'
import { PoliciesRepository } from '../repositories/policies-repository'
import { RolesRepository } from '../repositories/roles-repository'

interface CreateRoleUseCaseRequest {
  title: string
  description: string
  policies: string[]
}

interface CreateRoleUseCaseResponse {
  role: Role
}

export class CreateRoleUseCase {
  constructor(
    private rolesRepository: RolesRepository,
    private policiesRepository: PoliciesRepository,
  ) {}

  async execute({
    title,
    description,
    policies,
  }: CreateRoleUseCaseRequest): Promise<CreateRoleUseCaseResponse> {
    const existingRole = await this.rolesRepository.findByTitle(title)

    if (existingRole) {
      throw new RoleAlreadyExistsError()
    }

    if (policies.length === 0) {
      throw new NoPolicyProvidedError()
    }

    const validPolicies = await this.policiesRepository.countByIds(policies)

    if (validPolicies === 0 || validPolicies < policies.length) {
      throw new InvalidPolicyError()
    }

    const role = Role.create({
      title,
      description,
      policies: policies.map((policy) => new UniqueEntityID(policy)),
    })

    await this.rolesRepository.create(role)

    return {
      role,
    }
  }
}
