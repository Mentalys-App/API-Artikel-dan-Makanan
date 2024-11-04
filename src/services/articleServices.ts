import { IArticle } from '../types/articleTypes'
import Article from '../models/articleModel'

const getArticle = async (): Promise<IArticle[]> => {
  const article = await Article.find()
  return article
}

const getArticleById = async (id: string): Promise<IArticle | null> => {
  const article = await Article.findById(id)
  return article
}

export { getArticle, getArticleById }
