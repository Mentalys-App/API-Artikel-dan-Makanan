import { NextFunction, Request, Response, Router } from 'express'
import {
  createArticleController,
  getArticleByIdController,
  getArticleController
} from '../controllers/articleController'

const articleRouter = Router()

articleRouter.get('/article', (req: Request, res: Response, next: NextFunction) => {
  getArticleController(req, res, next)
})
articleRouter.get('/article/:id', (req: Request, res: Response, next: NextFunction) => {
  getArticleByIdController(req, res, next)
})
articleRouter.post('/article', (req: Request, res: Response, next: NextFunction) => {
  createArticleController(req, res, next)
})

export default articleRouter
