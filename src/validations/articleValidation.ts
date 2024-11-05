import { type IArticle } from '@/types/articleTypes'
import Joi from 'joi'

export const inputArticleValidation = (payload: IArticle): Joi.ValidationResult<IArticle> => {
  const articleValidationSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Judul artikel tidak boleh kosong',
      'string.base': 'Judul artikel harus berupa teks',
      'any.required': 'Judul artikel harus diisi'
    }),
    urlImage: Joi.string().uri().allow('').optional(),
    contentHtml: Joi.string().optional(),
    mental_state: Joi.string()
      .valid(
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
      )
      .required()
      .messages({
        'string.empty': 'Kondisi mental tidak boleh kosong',
        'any.only':
          'Kondisi mental harus salah satu dari: MDD, ASD, Loneliness, bipolar, anxiety, PTSD, sleep disord, psych depresn, ED, ADHD, PDD, atau OCD',
        'any.required': 'Kondisi mental wajib diisi'
      }),

    author: Joi.string().required().messages({
      'string.empty': 'Penulis artikel tidak boleh kosong',
      'string.base': 'Penulis artikel harus berupa teks',
      'any.required': 'Penulis artikel harus diisi'
    }),
    summary: Joi.string().required().messages({
      'string.empty': 'Ringkasan artikel tidak boleh kosong',
      'string.base': 'Ringkasan artikel harus berupa teks',
      'any.required': 'Ringkasan artikel harus diisi'
    }),
    tags: Joi.array().items(Joi.string()).optional()
  })
  return articleValidationSchema.validate(payload)
}
