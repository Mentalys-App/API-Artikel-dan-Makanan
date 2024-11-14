import { db } from '../config/firebase'
import { Article, GetArticle, GetArticlesResponse } from '../types/articleTypes'

export const saveArticle = async (article: Article): Promise<string> => {
  if (!article.id) {
    article.id = db.collection('articles').doc().id
  }

  if (!article.metadata.publish_date) {
    article.metadata.publish_date = new Date().toISOString()
  }
  article.metadata.last_updated = new Date().toISOString()
  article.metadata.views = article.metadata.views || 0
  article.metadata.likes = article.metadata.likes || 0

  await db.collection('articles').doc(article.id).set(article) // Save article to Firestore
  return article.id
}

export const getArticles = async (): Promise<GetArticlesResponse> => {
  const querySnapshot = await db.collection('articles').get()
  const articles: GetArticle[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Article
    articles.push({
      id: data.id,
      title: data.title,
      metadata: data.metadata
    })
  })

  const count = articles.length

  return {
    count,
    articles
  }
}

export const getArticleById = async (id: string): Promise<Article | null> => {
  const doc = await db.collection('articles').doc(id).get()
  return doc.exists ? (doc.data() as Article) : null
}

export const deleteArticle = async (id: string): Promise<void> => {
  await db.collection('articles').doc(id).delete()
}
