import multer, { Multer } from 'multer'
import { Request } from 'express'
import { AppError } from '@/utils/AppError'

const upload: Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true)
      } else {
        cb(AppError('Invalid image file type. Please upload a valid image file.', 415))
      }
    } else if (file.fieldname === 'html') {
      if (file.mimetype === 'text/html') {
        cb(null, true)
      } else {
        cb(AppError('Invalid file type. Please upload an HTML file.', 415))
      }
    } else {
      cb(AppError('Unexpected field. Please check your request.', 400))
    }
  }
})

export default upload
