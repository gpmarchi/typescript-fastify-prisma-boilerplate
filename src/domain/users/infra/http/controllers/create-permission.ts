import { CreatePermissionUseCase } from '@/domain/users/application/use-cases/create-permission'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function createPermission(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPermissionBodySchema = z.object({
    endpointId: z.string(),
    title: z.string(),
    description: z.string(),
  })

  const { endpointId, title, description } = createPermissionBodySchema.parse(
    request.body,
  )

  const createPermission = container.resolve(CreatePermissionUseCase)

  await createPermission.execute({
    endpointId,
    title,
    description,
  })

  return reply.status(201).send()
}
