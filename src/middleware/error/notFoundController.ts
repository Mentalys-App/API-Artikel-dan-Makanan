import { Request, Response, NextFunction } from 'express'
import { AppError } from './errorController'

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`BOOM! 💥💥 Can't find ${req.originalUrl} on this server!`, 404))
}
