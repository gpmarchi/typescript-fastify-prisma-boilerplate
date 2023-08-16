import { endpointsRoutes } from '@/domain/users/infra/http/routes/endpoints.routes'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(endpointsRoutes)
}
