import { FastifyInstance } from 'fastify'
import { createEndpoint } from '../controllers/create-endpoint'

export async function endpointsRoutes(app: FastifyInstance) {
  app.post('/endpoints', createEndpoint)
}
