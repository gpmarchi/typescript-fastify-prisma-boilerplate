import { AppError } from '@/shared/errors/app-error'

export class ResourceAlreadyExistsError extends AppError {
  constructor() {
    super('Resource already exists.', 409)
  }
}
