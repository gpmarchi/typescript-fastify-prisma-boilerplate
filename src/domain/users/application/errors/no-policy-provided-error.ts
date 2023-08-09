import { AppError } from '@/shared/errors/app-error'

export class NoPolicyProvidedError extends AppError {
  constructor() {
    super('No valid policy was provided.', 400)
  }
}
