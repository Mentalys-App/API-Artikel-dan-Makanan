export interface IArticle {
  title: string
  urlImage: string
  contentHtml: string
  mental_state:
    | 'MDD'
    | 'ASD'
    | 'Loneliness'
    | 'bipolar'
    | 'anxiety'
    | 'PTSD'
    | 'sleep disord'
    | 'psychot depresn'
    | 'ED'
    | 'ADHD'
    | 'PDD'
    | 'OCD'
  author: string
  summary: string
  tags?: string[]
}
