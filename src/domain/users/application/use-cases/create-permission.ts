import { Permission } from '../../enterprise/entities/permission'
import { PermissionAlreadyExistsError } from '../errors/permission-already-exists-error'
import { PermissionsRepository } from '../repositories/permissions-repository'

interface CreatePermissionUseCaseRequest {
  title: string
  description: string
}

interface CreatePermissionUseCaseResponse {
  permission: Permission
}

export class CreatePermissionUseCase {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute({
    title,
    description,
  }: CreatePermissionUseCaseRequest): Promise<CreatePermissionUseCaseResponse> {
    const existingPermission = await this.permissionsRepository.findByTitle(
      title,
    )

    if (existingPermission) {
      throw new PermissionAlreadyExistsError()
    }

    const permission = Permission.create({
      title,
      description,
    })

    await this.permissionsRepository.create(permission)

    return {
      permission,
    }
  }
}
