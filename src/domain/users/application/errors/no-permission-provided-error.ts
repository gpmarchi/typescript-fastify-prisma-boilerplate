import { AppError } from '@/shared/errors/app-error'

export class NoPermissionProvidedError extends AppError {
  constructor() {
    super('No valid permission was provided.', 400)
  }
}
