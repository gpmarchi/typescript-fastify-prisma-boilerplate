import { AppError } from '@/shared/errors/app-error'

export class RoleAlreadyExistsError extends AppError {
  constructor() {
    super('Role already exists.', 409)
  }
}
