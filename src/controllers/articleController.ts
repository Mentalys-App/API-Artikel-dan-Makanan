import { NextFunction, Request, Response } from 'express'
import { getArticle, getArticleById } from '../services/articleServices'
import mongoose from 'mongoose'
import { AppError } from '../middleware/error/errorController'

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id)
}

const getArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const data = await getArticle()
    return res.status(200).json({
      error: null,
      message: 'Article retrieved successfully',
      data
    })
  } catch (error: Error | unknown) {
    next(error)
  }
}

const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      next(new AppError(`BOOM! 💥 Invalid id: "${id}" is not a valid ObjectId`, 400))
      return
    }
    const data = await getArticleById(id)
    return res.status(200).json({
      error: null,
      message: 'Article retrieved successfully',
      data
    })
  } catch (error: Error | unknown) {
    next(error)
  }
}

export { getArticleController, getArticleByIdController }
