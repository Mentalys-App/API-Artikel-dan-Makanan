import { Router } from 'express'
import articleRouter from './articleRouter'
import imageRouter from './imageRouter'
import { notFound } from '../middleware/error/notFoundController'
import { globalErrorHandler } from '../middleware/error/errorController'

const app = Router()
app.use('/api/v1', articleRouter)
app.use('/api/v2', imageRouter)
app.use('*', notFound)
app.use(globalErrorHandler)
export default app
