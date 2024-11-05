import multer, { Multer } from 'multer'
import { Request } from 'express'

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
        cb(new Error('Invalid image file type. Please upload a valid image file.'))
      }
    } else if (file.fieldname === 'html') {
      if (file.mimetype === 'text/html') {
        cb(null, true)
      } else {
        cb(new Error('Invalid file type. Please upload an HTML file.'))
      }
    } else {
      cb(new Error('Unexpected field. Please check your request.'))
    }
  }
})

export default upload
