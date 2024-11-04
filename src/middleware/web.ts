import express, { type Application, type Request, type Response } from 'express'
import appMiddleware from '../middleware'
import { notFound } from '../controllers/notFoundController'
import { globalErrorHandler } from '../controllers/errorController'

const web: Application = express()
web.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Mentalys recommendation articles API running!'
  })
})
web.all('*', notFound)
web.use(globalErrorHandler)
web.use(appMiddleware)

export default web
