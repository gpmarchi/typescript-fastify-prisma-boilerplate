import { AppError } from '@/shared/errors/app-error'

export class InvalidRoleError extends AppError {
  constructor() {
    super('Invalid role provided.', 400)
  }
}
