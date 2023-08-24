import { Endpoint } from '@/domain/users/enterprise/entities/endpoint'
import { HttpMethod } from '@/domain/users/enterprise/enums/http-method'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

import { Endpoint as RawEndpoint } from '@prisma/client'

export class PrismaEndpointMapper {
  static toPrisma(endpoint: Endpoint): RawEndpoint {
    return {
      id: endpoint.id.toString(),
      title: endpoint.title,
      description: endpoint.description,
      httpMethod: endpoint.httpMethod,
      uri: endpoint.uri,
      createdAt: endpoint.createdAt,
      updatedAt: endpoint.updatedAt ?? null,
    }
  }

  static toDomain(raw: RawEndpoint): Endpoint {
    return Endpoint.create(
      {
        title: raw.title,
        description: raw.description,
        httpMethod: raw.httpMethod as HttpMethod,
        uri: raw.uri,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
