import { AppError } from '@/shared/errors/app-error'

export class InvalidPolicyError extends AppError {
  constructor() {
    super('Invalid policy provided.', 400)
  }
}
