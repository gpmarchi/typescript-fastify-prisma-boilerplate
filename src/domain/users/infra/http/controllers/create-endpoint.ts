import { CreateEndpointUseCase } from '@/domain/users/application/use-cases/create-endpoint'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

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

  const createEndpoint = container.resolve(CreateEndpointUseCase)

  await createEndpoint.execute({
    title,
    description,
    uri,
  })

  return reply.status(201).send()
}
