import { AppError } from '@/shared/errors/app-error'

export class EndpointNotFoundError extends AppError {
  constructor() {
    super('Endpoint not found.', 404)
  }
}
