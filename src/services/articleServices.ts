import { FilterQuery } from 'mongoose'
import {
  IArticle,
  IPaginationQuery,
  IPaginatedResponse,
  IPaginationOptions
} from '../types/articleTypes'
import Article from '../models/articleModel'

const DEFAULT_PAGE_SIZE: number = 10
const DEFAULT_PAGE: number = 1

const buildFilterQuery = (query: IPaginationQuery): FilterQuery<IArticle> => {
  const filterQuery: Record<string, unknown> = {}

  Object.entries(query).forEach(([key, value]: [string, unknown]) => {
    if (value && !['page', 'perPage'].includes(key)) {
      switch (key) {
        case 'mental_state':
          filterQuery[key] = value
          break
        case 'tags':
          filterQuery[key] = {
            $in: Array.isArray(value) ? value : [value]
          }
          break
        case 'author':
        case 'title':
          filterQuery[key] = new RegExp(String(value), 'i')
          break
        default:
          break
      }
    }
  })

  return filterQuery as FilterQuery<IArticle>
}

const calculatePagination = (query: IPaginationQuery): IPaginationOptions => {
  const page: number = query.page ? Math.max(1, parseInt(query.page, 10)) : DEFAULT_PAGE
  const perPage: number = query.perPage ? parseInt(query.perPage, 10) : DEFAULT_PAGE_SIZE
  const skip: number = (page - 1) * perPage

  return { page, perPage, skip }
}

const buildPaginationLinks = (
  baseUrl: string,
  currentPage: number,
  totalPages: number,
  perPage: number,
  query: IPaginationQuery
): { next: string | null; prev: string | null } => {
  const queryParams: string[] = []

  Object.entries(query).forEach(([key, value]: [string, unknown]) => {
    if (value && !['page', 'perPage'].includes(key)) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.push(`${key}=${encodeURIComponent(String(v))}`))
      } else {
        queryParams.push(`${key}=${encodeURIComponent(String(value))}`)
      }
    }
  })

  const baseQueryString: string = queryParams.length > 0 ? `&${queryParams.join('&')}` : ''

  return {
    next:
      currentPage < totalPages
        ? `${baseUrl}/api/v1/article?perPage=${perPage}&page=${currentPage + 1}${baseQueryString}`
        : null,
    prev:
      currentPage > 1
        ? `${baseUrl}/api/v1/article?perPage=${perPage}&page=${currentPage - 1}${baseQueryString}`
        : null
  }
}

export const getArticles = async (
  query: IPaginationQuery,
  baseUrl: string
): Promise<IPaginatedResponse> => {
  const { page, perPage, skip } = calculatePagination(query)
  const filterQuery: FilterQuery<IArticle> = buildFilterQuery(query)

  const [totalData, articles] = await Promise.all([
    Article.countDocuments(filterQuery),
    Article.find(filterQuery).sort({ createdAt: -1 }).skip(skip).limit(perPage).exec()
  ])

  const totalPages: number = Math.ceil(totalData / perPage)
  const { next, prev } = buildPaginationLinks(baseUrl, page, totalPages, perPage, query)

  return {
    data: articles,
    perPage,
    page,
    totalPages,
    totalData,
    next,
    prev
  }
}

export const getArticleById = async (id: string): Promise<IArticle | null> => {
  const article: IArticle | null = await Article.findById(id)
  return article
}

export const createArticle = async (
  payload: Omit<IArticle, 'createdAt' | 'updatedAt'>
): Promise<IArticle> => {
  const newArticle: IArticle = await Article.create(payload)
  return newArticle
}
