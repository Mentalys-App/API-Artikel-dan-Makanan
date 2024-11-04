import mongoose, { Schema } from 'mongoose'
import { IArticle } from '../types/articleTypes'

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    mental_state: {
      type: String,
      required: true,
      enum: ['kondisi sehat', 'gangguan kecemasan', 'stres', 'depresi']
    },
    content: {
      pendahuluan: { type: String, required: true },
      apa_itu: { type: String, required: true },
      penyebab: [
        {
          judul: { type: String, required: true },
          isi: { type: String, required: true }
        }
      ],
      gejala: {
        fisik: { type: String, required: true },
        emosional: { type: String, required: true },
        perilaku: { type: String, required: true }
      },
      tips: [{ type: String, required: true }],
      kapan_mencari_bantuan: { type: String, required: true }
    },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    tags: [{ type: String }]
  },
  { timestamps: true }
)

const ArticleModel = mongoose.model<IArticle>('Article', articleSchema)

export default ArticleModel
