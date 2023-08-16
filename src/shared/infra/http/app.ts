import { errorHandler } from '@/shared/errors/error-handler'
import fastify from 'fastify'
import { appRoutes } from './routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(errorHandler)
