import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { createArticle, getArticles, getArticleById } from '../services/articleServices'
import { AppError } from '@/utils/AppError'
import { inputArticleValidation } from '@/validations/articleValidation'
import { formatJoiError } from '@/utils/joiValidation'
import { uploadImage } from '@/services/uploadServices'
import { IApiResponse, IArticle, IPaginatedResponse } from '../types/articleTypes'

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id)
}

interface ArticleFiles {
  readonly image?: readonly Express.Multer.File[]
  readonly html?: readonly Express.Multer.File[]
}

export const getArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiResponse<IPaginatedResponse>> | void> => {
  try {
    const baseUrl: string = `${req.protocol}://${req.get('host')}`
    const data: IPaginatedResponse = await getArticles(req.query, baseUrl)

    return res.status(200).json({
      error: null,
      message: 'Articles retrieved successfully',
      data
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const getArticleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiResponse<IArticle | null>> | void> => {
  try {
    const { id } = req.params

    if (!isValidObjectId(id)) {
      return next(AppError(`Invalid id: "${id}" is not a valid ObjectId`, 400))
    }

    const data: IArticle | null = await getArticleById(id)

    if (!data) {
      return next(AppError('Article not found', 404))
    }

    return res.status(200).json({
      error: null,
      message: 'Article retrieved successfully',
      data
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const createArticleController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IApiResponse<IArticle>> | void> => {
  try {
    const { error, value } = inputArticleValidation(req.body)

    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }

    const files = req.files as ArticleFiles | undefined

    if (!files?.image?.[0]) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Image file is required',
        data: undefined
      })
    }

    if (!files?.html?.[0]) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'HTML file is required',
        data: undefined
      })
    }

    const imageUrl: string = await uploadImage(files.image[0])
    const htmlContent: string = files.html[0].buffer.toString('utf8')

    const articleData = {
      ...value,
      urlImage: imageUrl,
      contentHtml: htmlContent
    }

    const data: IArticle = await createArticle(articleData)

    return res.status(201).json({
      error: null,
      message: 'Article created successfully',
      data
    })
  } catch (error: unknown) {
    next(error)
  }
}
