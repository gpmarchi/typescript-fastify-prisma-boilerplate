import { EndpointsRepository } from '@/domain/users/application/repositories/endpoints-repository'
import { Endpoint } from '@/domain/users/enterprise/entities/endpoint'
import { prisma } from '@/shared/lib/prisma'
import { PrismaEndpointMapper } from '../mappers/prisma-endpoint-mapper'

export class PrismaEndpointsRepository implements EndpointsRepository {
  async findByTitle(title: string): Promise<Endpoint | null> {
    const endpoint = await prisma.endpoint.findFirst({
      where: {
        title,
      },
    })

    if (!endpoint) {
      return null
    }

    return PrismaEndpointMapper.toDomain(endpoint)
  }

  async findById(id: string): Promise<Endpoint | null> {
    const endpoint = await prisma.endpoint.findUnique({
      where: {
        id,
      },
    })

    if (!endpoint) {
      return null
    }

    return PrismaEndpointMapper.toDomain(endpoint)
  }

  async create(endpoint: Endpoint): Promise<void> {
    const raw = PrismaEndpointMapper.toPrisma(endpoint)

    await prisma.endpoint.create({
      data: raw,
    })
  }
}
