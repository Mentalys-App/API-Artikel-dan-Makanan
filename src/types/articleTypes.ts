export interface IUrlImage {
  url: string
}

export interface IPenyebab {
  judul: string
  isi: string
}

export interface IGejala {
  fisik: string
  emosional: string
  perilaku: string
}

export interface IContent {
  pendahuluan: string
  apa_itu: string
  penyebab: IPenyebab[]
  gejala: IGejala
  tips: string[]
  kapan_mencari_bantuan: string
}

export interface IArticle {
  title: string
  url: IUrlImage
  mental_state: 'kondisi sehat' | 'gangguan kecemasan' | 'stres' | 'depresi'
  content: IContent
  author: string
  summary: string
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}
