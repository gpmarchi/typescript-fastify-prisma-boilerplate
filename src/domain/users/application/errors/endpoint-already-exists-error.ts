import { AppError } from '@/shared/errors/app-error'

export class EndpointAlreadyExistsError extends AppError {
  constructor() {
    super('Endpoint already exists.', 409)
  }
}
