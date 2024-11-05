import mongoose, { Schema } from 'mongoose'
import { IArticle } from '../types/articleTypes'

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    urlImage: { type: String, required: false },
    contentHtml: { type: String, required: true },
    mental_state: {
      type: String,
      required: true,
      enum: [
        'MDD',
        'ASD',
        'Loneliness',
        'bipolar',
        'anxiety',
        'PTSD',
        'sleep disord',
        'psychot depresn',
        'ED',
        'ADHD',
        'PDD',
        'OCD'
      ]
    },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: [String], required: false }
  },
  { timestamps: true }
)

const ArticleModel = mongoose.model<IArticle>('Article', articleSchema)

export default ArticleModel
