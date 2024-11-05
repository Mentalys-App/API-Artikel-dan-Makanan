import { NextFunction, Request, Response, Router } from 'express'
import {
  uploadImageController,
  getImagesController,
  getImageByIdController,
  deleteImageController,
  updateImageController
} from '../controllers/imageController'

const imageRouter = Router()

// Upload Image
imageRouter.post('/images', (req: Request, res: Response, next: NextFunction) => {
  uploadImageController(req, res, next)
})

// Get All Images
imageRouter.get('/images', (req: Request, res: Response, next: NextFunction) => {
  getImagesController(req, res, next)
})

// Get Image by ID
imageRouter.get('/images/:id', (req: Request, res: Response, next: NextFunction) => {
  getImageByIdController(req, res, next)
})

// Update Image by ID
imageRouter.patch('/images/:id', (req: Request, res: Response, next: NextFunction) => {
  updateImageController(req, res, next)
})

// Delete Image by ID
imageRouter.delete('/images/:id', (req: Request, res: Response, next: NextFunction) => {
  deleteImageController(req, res, next)
})

export default imageRouter
