import { AppError } from '@/shared/errors/app-error'

export class PermissionAlreadyExistsError extends AppError {
  constructor() {
    super('Permission already exists.', 409)
  }
}
