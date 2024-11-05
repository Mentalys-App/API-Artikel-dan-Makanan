import { NextFunction, Request, Response } from 'express'
import { createArticle, getArticle, getArticleById } from '../services/articleServices'
import mongoose from 'mongoose'
import { AppError } from '@/utils/AppError'
import { inputArticleValidation } from '@/validations/articleValidation'
import { formatJoiError } from '@/utils/joiValidation'
import { uploadImage } from '@/services/uploadServices'

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

    let imageUrl = ''
    let htmlContent = ''

    if (req.files) {
      if (req.files && (req.files as { image: Express.Multer.File[] }).image) {
        const imageFile = (req.files as { image: Express.Multer.File[] }).image[0]
        imageUrl = await uploadImage(imageFile)
      } else {
        return res.status(400).json({
          error: null,
          message: 'Image file is required'
        })
      }
      if ((req.files as { [fieldname: string]: Express.Multer.File[] }).html) {
        const htmlFile = (req.files as { [fieldname: string]: Express.Multer.File[] }).html[0]
        htmlContent = htmlFile.buffer.toString('utf8')
      } else {
        return res.status(400).json({
          error: null,
          message: 'HTML file is required'
        })
      }
    }

    const articleData = {
      ...value,
      urlImage: imageUrl,
      contentHtml: htmlContent
    }

    const data = await createArticle(articleData)
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
