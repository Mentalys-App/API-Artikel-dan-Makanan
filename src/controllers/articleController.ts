import { NextFunction, Request, Response } from 'express'
import { createArticle, getArticle, getArticleById } from '../services/articleServices'
import mongoose from 'mongoose'
import { AppError } from '@/utils/AppError'
import { inputArticleValidation } from '@/validations/articleValidation'
import { formatJoiError } from '@/utils/joiValidation'

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
      next(AppError(`BOOM! 💥 Invalid id: "${id}" is not a valid ObjectId`, 400))
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

const createArticleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = inputArticleValidation(req.body)
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }

    const data = await createArticle(value)
    return res.status(201).json({
      error: null,
      message: 'Article created successfully',
      data
    })
  } catch (error) {
    next(error)
  }
}

export { getArticleController, getArticleByIdController, createArticleController }
