import { HttpMethod } from '@/domain/users/enterprise/enums/http-method'
import { app } from '@/shared/infra/http/app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Create endpoint (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new endpoint', async () => {
    const response = await request(app.server).post('/endpoints').send({
      title: 'Test title',
      description: 'Test description',
      httpMethod: HttpMethod.GET,
      uri: '/endpoints',
    })

    expect(response.statusCode).toEqual(201)
  })
})
