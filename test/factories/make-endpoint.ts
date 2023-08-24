import { faker } from '@faker-js/faker'

import {
  Endpoint,
  EndpointProps,
} from '@/domain/users/enterprise/entities/endpoint'
import { HttpMethod } from '@/domain/users/enterprise/enums/http-method'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'

export function makeEndpoint(
  override: Partial<EndpointProps> = {},
  id?: UniqueEntityID,
) {
  const endpoint = Endpoint.create(
    {
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      httpMethod: HttpMethod.GET,
      uri: `/${faker.lorem.word()}`,
      ...override,
    },
    id,
  )

  return endpoint
}
