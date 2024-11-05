import { NextFunction, Request, Response } from 'express'
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImage
} from '../services/imageServices'
import mongoose from 'mongoose'
import { AppError } from '@/utils/AppError'

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id)
}

export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' })
    }

    const imageUrl = await uploadImage(req.file)
    return res.status(201).json({
      error: null,
      message: 'Image uploaded successfully',
      data: { imageUrl }
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const getImagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const data = await getImages()
    return res.status(200).json({
      error: null,
      message: 'Images retrieved successfully',
      data
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const getImageByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      next(AppError(`Invalid id: "${id}" is not a valid ObjectId`, 400))
      return
    }

    const data = await getImageById(id)
    return res.status(200).json({
      error: null,
      message: 'Image retrieved successfully',
      data
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const updateImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      next(AppError(`Invalid id: "${id}" is not a valid ObjectId`, 400))
      return
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' })
    }

    const imageUrl = await updateImage(id, req.file)
    return res.status(200).json({
      error: null,
      message: 'Image updated successfully',
      data: { imageUrl }
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const deleteImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      next(AppError(`Invalid id: "${id}" is not a valid ObjectId`, 400))
      return
    }

    await deleteImage(id)
    return res.status(204).json({
      error: null,
      message: 'Image deleted successfully'
    })
  } catch (error: unknown) {
    next(error)
  }
}
