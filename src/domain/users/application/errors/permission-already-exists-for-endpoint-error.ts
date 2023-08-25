import { AppError } from '@/shared/errors/app-error'

export class PermissionAlreadyExistsForEndpointError extends AppError {
  constructor() {
    super('There is a permission already associated with this endpoint.', 409)
  }
}
