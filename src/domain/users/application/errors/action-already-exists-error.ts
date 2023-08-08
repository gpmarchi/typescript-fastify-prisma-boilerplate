import { AppError } from '@/shared/errors/app-error'

export class ActionAlreadyExistsError extends AppError {
  constructor() {
    super('Action already exists.', 409)
  }
}
