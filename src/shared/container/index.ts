import { EndpointsRepository } from '@/domain/users/application/repositories/endpoints-repository'
import { PermissionsRepository } from '@/domain/users/application/repositories/permissions-repository'
import { PrismaEndpointsRepository } from '@/domain/users/infra/database/prisma/repositories/prisma-endpoints-repository'
import { PrismaPermissionsRepository } from '@/domain/users/infra/database/prisma/repositories/prisma-permissions-repository'
import { container } from 'tsyringe'

container.registerSingleton<EndpointsRepository>(
  'EndpointsRepository',
  PrismaEndpointsRepository,
)

container.registerSingleton<PermissionsRepository>(
  'PermissionsRepository',
  PrismaPermissionsRepository,
)
