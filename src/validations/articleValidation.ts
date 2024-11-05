import { type IArticle } from '@/types/articleTypes'
import Joi from 'joi'

export const inputArticleValidation = (payload: IArticle): Joi.ValidationResult<IArticle> => {
  const articleValidationSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Judul artikel tidak boleh kosong',
      'string.base': 'Judul artikel harus berupa teks',
      'any.required': 'Judul artikel wajib diisi'
    }),

    url: Joi.string().uri().required().messages({
      'string.empty': 'URL gambar tidak boleh kosong',
      'string.uri': 'URL gambar harus berupa URL yang valid',
      'string.base': 'URL gambar harus berupa teks',
      'any.required': 'URL gambar wajib diisi'
    }),

    mental_state: Joi.string()
      .valid('kondisi sehat', 'gangguan kecemasan', 'stres', 'depresi')
      .required()
      .messages({
        'string.empty': 'Kondisi mental tidak boleh kosong',
        'any.only':
          'Kondisi mental harus salah satu dari: kondisi sehat, gangguan kecemasan, stres, atau depresi',
        'any.required': 'Kondisi mental wajib diisi'
      }),

    content: Joi.object({
      pendahuluan: Joi.string().required().messages({
        'string.empty': 'Pendahuluan tidak boleh kosong',
        'string.base': 'Pendahuluan harus berupa teks',
        'any.required': 'Pendahuluan wajib diisi'
      }),

      apa_itu: Joi.string().required().messages({
        'string.empty': 'Penjelasan (apa itu) tidak boleh kosong',
        'string.base': 'Penjelasan (apa itu) harus berupa teks',
        'any.required': 'Penjelasan (apa itu) wajib diisi'
      }),

      penyebab: Joi.array()
        .items(
          Joi.object({
            judul: Joi.string().required().messages({
              'string.empty': 'Judul penyebab tidak boleh kosong',
              'string.base': 'Judul penyebab harus berupa teks',
              'any.required': 'Judul penyebab wajib diisi'
            }),
            isi: Joi.string().required().messages({
              'string.empty': 'Isi penyebab tidak boleh kosong',
              'string.base': 'Isi penyebab harus berupa teks',
              'any.required': 'Isi penyebab wajib diisi'
            })
          })
        )
        .min(1)
        .messages({
          'array.min': 'Minimal harus ada 1 penyebab',
          'array.base': 'Penyebab harus berupa array'
        }),

      gejala: Joi.object({
        fisik: Joi.string().required().messages({
          'string.empty': 'Gejala fisik tidak boleh kosong',
          'string.base': 'Gejala fisik harus berupa teks',
          'any.required': 'Gejala fisik wajib diisi'
        }),
        emosional: Joi.string().required().messages({
          'string.empty': 'Gejala emosional tidak boleh kosong',
          'string.base': 'Gejala emosional harus berupa teks',
          'any.required': 'Gejala emosional wajib diisi'
        }),
        perilaku: Joi.string().required().messages({
          'string.empty': 'Gejala perilaku tidak boleh kosong',
          'string.base': 'Gejala perilaku harus berupa teks',
          'any.required': 'Gejala perilaku wajib diisi'
        })
      }).required(),

      tips: Joi.array()
        .items(
          Joi.string().messages({
            'string.empty': 'Tips tidak boleh kosong',
            'string.base': 'Tips harus berupa teks'
          })
        )
        .min(1)
        .required()
        .messages({
          'array.min': 'Minimal harus ada 1 tips',
          'array.base': 'Tips harus berupa array',
          'any.required': 'Tips wajib diisi'
        }),

      kapan_mencari_bantuan: Joi.string().required().messages({
        'string.empty': 'Informasi kapan mencari bantuan tidak boleh kosong',
        'string.base': 'Informasi kapan mencari bantuan harus berupa teks',
        'any.required': 'Informasi kapan mencari bantuan wajib diisi'
      })
    }).required(),

    author: Joi.string().required().messages({
      'string.empty': 'Nama penulis tidak boleh kosong',
      'string.base': 'Nama penulis harus berupa teks',
      'any.required': 'Nama penulis wajib diisi'
    }),

    summary: Joi.string().required().messages({
      'string.empty': 'Ringkasan tidak boleh kosong',
      'string.base': 'Ringkasan harus berupa teks',
      'any.required': 'Ringkasan wajib diisi'
    }),

    tags: Joi.array()
      .items(
        Joi.string().messages({
          'string.empty': 'Tag tidak boleh kosong',
          'string.base': 'Tag harus berupa teks'
        })
      )
      .min(1)
      .messages({
        'array.min': 'Minimal harus ada 1 tag',
        'array.base': 'Tags harus berupa array'
      })
  })
  return articleValidationSchema.validate(payload)
}
