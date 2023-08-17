import { EndpointsRepository } from '@/domain/users/application/repositories/endpoints-repository'
import { PrismaEndpointsRepository } from '@/domain/users/infra/database/prisma/repositories/prisma-endpoints-repository'
import { container } from 'tsyringe'

container.registerSingleton<EndpointsRepository>(
  'EndpointsRepository',
  PrismaEndpointsRepository,
)
