import { prisma } from '@/shared/infra/database/prisma'
import { app } from '@/shared/infra/http/app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Create permission (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new permission', async () => {
    const endpoint = await prisma.endpoint.create({
      data: {
        title: 'Create endpoint endpoint',
        description: 'Endpoint for creating a new endpoint',
        httpMethod: 'POST',
        uri: '/endpoints',
      },
    })

    const response = await request(app.server).post('/permissions').send({
      endpointId: endpoint.id,
      title: 'Test title',
      description: 'Test description',
    })

    expect(response.statusCode).toEqual(201)
  })
})
