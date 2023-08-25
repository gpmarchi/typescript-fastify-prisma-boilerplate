import { Permission } from '@/domain/users/enterprise/entities/permission'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

import { Permission as RawPermission } from '@prisma/client'

export class PrismaPermissionMapper {
  static toPrisma(permission: Permission): RawPermission {
    return {
      id: permission.id.toString(),
      endpointId: permission.endpointId.toString(),
      slug: permission.slug.toString(),
      title: permission.title,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt ?? null,
    }
  }

  static toDomain(raw: RawPermission): Permission {
    return Permission.create(
      {
        endpointId: new UniqueEntityID(raw.endpointId),
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
