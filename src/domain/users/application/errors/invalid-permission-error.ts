import { AppError } from '@/shared/errors/app-error'

export class InvalidPermissionError extends AppError {
  constructor() {
    super('Invalid permission provided.', 400)
  }
}
