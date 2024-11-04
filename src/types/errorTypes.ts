export interface IAppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
}

export interface IDatabaseError {
  path?: string
  value?: string
  code?: number
  errmsg?: string
  errors?: Record<string, { message: string }>
  name?: string
}
