import { endpointsRoutes } from '@/domain/users/infra/http/routes/endpoints.routes'
import { permissionsRoutes } from '@/domain/users/infra/http/routes/permissions.route'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(endpointsRoutes)
  app.register(permissionsRoutes)
}
