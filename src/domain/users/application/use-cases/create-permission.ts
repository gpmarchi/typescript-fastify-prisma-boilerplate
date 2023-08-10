import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Permission } from '../../enterprise/entities/permission'
import { EndpointNotFoundError } from '../errors/endpoint-not-found-error'
import { PermissionAlreadyExistsError } from '../errors/permission-already-exists-error'
import { EndpointsRepository } from '../repositories/endpoints-repository'
import { PermissionsRepository } from '../repositories/permissions-repository'

interface CreatePermissionUseCaseRequest {
  endpointId: string
  title: string
  description: string
}

interface CreatePermissionUseCaseResponse {
  permission: Permission
}

export class CreatePermissionUseCase {
  constructor(
    private permissionsRepository: PermissionsRepository,
    private endpointsRepository: EndpointsRepository,
  ) {}

  async execute({
    endpointId,
    title,
    description,
  }: CreatePermissionUseCaseRequest): Promise<CreatePermissionUseCaseResponse> {
    const existingPermission = await this.permissionsRepository.findByTitle(
      title,
    )

    if (existingPermission) {
      throw new PermissionAlreadyExistsError()
    }

    const endpoint = await this.endpointsRepository.findById(endpointId)

    if (!endpoint) {
      throw new EndpointNotFoundError()
    }

    const permission = Permission.create({
      endpointId: new UniqueEntityID(endpointId),
      title,
      description,
    })

    await this.permissionsRepository.create(permission)

    return {
      permission,
    }
  }
}
