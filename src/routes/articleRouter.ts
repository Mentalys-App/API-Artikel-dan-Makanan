import { NextFunction, Request, Response, Router } from 'express'
import {
  createArticleController,
  deleteArticleController,
  getArticleByIdController,
  getArticlesController
} from '../controllers/articleController'
import upload from '@/middleware/uploadMiddleware'

const articleRouter: Router = Router()

articleRouter.get('/article', (req: Request, res: Response, next: NextFunction): void => {
  void getArticlesController(req, res, next)
})

articleRouter.get('/article/:id', (req: Request, res: Response, next: NextFunction): void => {
  void getArticleByIdController(req, res, next)
})

articleRouter.post(
  '/article',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'html', maxCount: 1 }
  ]),
  (req: Request, res: Response, next: NextFunction): void => {
    void createArticleController(req, res, next)
  }
)

articleRouter.delete('/article/:id', (req: Request, res: Response, next: NextFunction): void => {
  void deleteArticleController(req, res, next)
})

export default articleRouter
