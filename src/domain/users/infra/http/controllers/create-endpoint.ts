import { CreateEndpointUseCase } from '@/domain/users/application/use-cases/create-endpoint'
import { HttpMethod } from '@/domain/users/enterprise/enums/http-method'
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
    httpMethod: z.nativeEnum(HttpMethod),
    uri: z.string().regex(/^\/[a-zA-Z0-9_\-/]+$/),
  })

  const { title, description, httpMethod, uri } =
    createEndpointBodySchema.parse(request.body)

  const createEndpoint = container.resolve(CreateEndpointUseCase)

  await createEndpoint.execute({
    title,
    description,
    httpMethod,
    uri,
  })

  return reply.status(201).send()
}
