import { type Request, type Response } from 'express'
import logger from '../utils/logger'
import { IAppError, IDatabaseError } from '../types/errorTypes'

export class AppError extends Error implements IAppError {
  public statusCode: number
  public status: string
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

const handleCastErrorDB = (err: IDatabaseError): AppError => {
  const message: string = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: IDatabaseError): AppError => {
  const value: string = (err.errmsg && err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0]) || 'unknown'
  const message: string = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err: IDatabaseError): AppError => {
  const errors: string[] = Object.values(err.errors || {}).map((el) => el.message)
  const message: string = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = (): AppError => new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrorDev = (err: IAppError, req: Request, res: Response): Response => {
  logger.error('ERROR 💥', {
    message: err.message,
    stack: err.stack
  })

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err: IAppError, req: Request, res: Response): Response => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }

  // Programming or other unknown error: don't leak error details
  logger.error('ERROR 💥', {
    message: err.message,
    stack: err.stack
  })

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  })
}

export const globalErrorHandler = (err: Error, req: Request, res: Response): void => {
  const error: IAppError = err as IAppError
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    let handledError: IAppError = { ...error }
    handledError.message = err.message

    if (error.name === 'CastError') handledError = handleCastErrorDB(error as IDatabaseError)
    if ((error as IDatabaseError).code === 11000)
      handledError = handleDuplicateFieldsDB(error as IDatabaseError)
    if (error.name === 'ValidationError')
      handledError = handleValidationErrorDB(error as IDatabaseError)
    if (error.name === 'JsonWebTokenError') handledError = handleJWTError()
    if (error.name === 'TokenExpiredError') handledError = handleJWTExpiredError()

    sendErrorProd(handledError, req, res)
  }
}
