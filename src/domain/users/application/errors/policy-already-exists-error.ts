import { AppError } from '@/shared/errors/app-error'

export class PolicyAlreadyExistsError extends AppError {
  constructor() {
    super('Policy already exists.', 409)
  }
}
