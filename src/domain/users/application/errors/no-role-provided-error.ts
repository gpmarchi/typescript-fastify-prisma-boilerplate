import { AppError } from '@/shared/errors/app-error'

export class NoRoleProvidedError extends AppError {
  constructor() {
    super('No valid role was provided.', 400)
  }
}
