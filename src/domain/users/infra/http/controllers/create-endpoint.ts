import { CreateEndpointUseCase } from '@/domain/users/application/use-cases/create-endpoint'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaEndpointsRepository } from '../../database/prisma/repositories/prisma-endpoints-repository'

export async function createEndpoint(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEndpointBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    uri: z.string().url(),
  })

  const { title, description, uri } = createEndpointBodySchema.parse(
    request.body,
  )

  const endpointsRepository = new PrismaEndpointsRepository()
  const createEndpoint = new CreateEndpointUseCase(endpointsRepository)

  await createEndpoint.execute({
    title,
    description,
    uri,
  })

  return reply.status(201).send()
}
