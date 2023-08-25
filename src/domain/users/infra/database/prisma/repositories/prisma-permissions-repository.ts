import { PermissionsRepository } from '@/domain/users/application/repositories/permissions-repository'
import { Permission } from '@/domain/users/enterprise/entities/permission'
import { prisma } from '@/shared/infra/database/prisma'
import { PrismaPermissionMapper } from '../mappers/prisma-permission-mapper'

export class PrismaPermissionsRepository implements PermissionsRepository {
  async findByTitle(title: string): Promise<Permission | null> {
    const permission = await prisma.permission.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
      },
    })

    if (!permission) {
      return null
    }

    return PrismaPermissionMapper.toDomain(permission)
  }

  async findByEndpointId(endpointId: string): Promise<Permission | null> {
    const permission = await prisma.permission.findUnique({
      where: {
        endpointId,
      },
    })

    if (!permission) {
      return null
    }

    return PrismaPermissionMapper.toDomain(permission)
  }

  async countByIds(ids: string[]): Promise<number> {
    const count = await prisma.permission.count({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return count
  }

  async create(permission: Permission): Promise<void> {
    const raw = PrismaPermissionMapper.toPrisma(permission)

    await prisma.permission.create({
      data: raw,
    })
  }
}
