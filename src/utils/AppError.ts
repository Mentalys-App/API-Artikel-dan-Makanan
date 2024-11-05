// Tipe IAppError untuk mendefinisikan struktur kesalahan aplikasi
export interface IAppError extends Error {
  statusCode: number
  status: string
  isOperational?: boolean
}

// Fungsi untuk membuat objek kesalahan terstruktur
export const AppError = (message: string, statusCode: number): IAppError => {
  const error = new Error(message) as IAppError
  error.statusCode = statusCode
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
  error.isOperational = true

  return error
}
