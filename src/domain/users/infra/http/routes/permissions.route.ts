import { FastifyInstance } from 'fastify'
import { createPermission } from '../controllers/create-permission'

export async function permissionsRoutes(app: FastifyInstance) {
  app.post('/permissions', createPermission)
}
