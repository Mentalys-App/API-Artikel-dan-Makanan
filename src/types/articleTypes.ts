export interface IArticle {
  readonly title: string
  readonly urlImage: string
  readonly contentHtml: string
  readonly mental_state:
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
  readonly author: string
  readonly summary: string
  readonly tags?: readonly string[]
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export interface IPaginationQuery {
  readonly perPage?: string
  readonly page?: string
  readonly mental_state?: IArticle['mental_state']
  readonly author?: string
  readonly title?: string
  readonly tags?: string | readonly string[]
  readonly [key: string]: unknown
}

export interface IPaginationOptions {
  readonly page: number
  readonly perPage: number
  readonly skip: number
}

export interface IPaginatedResponse {
  readonly data: readonly IArticle[]
  readonly perPage: number
  readonly page: number
  readonly next: string | null
  readonly prev: string | null
  readonly totalPages: number
  readonly totalData: number
}

export interface IApiResponse<T> {
  readonly error: null | string
  readonly message: string
  readonly data?: T
}
