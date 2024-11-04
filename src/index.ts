import express, { type Application, type Request, type Response } from 'express'
import 'dotenv/config'
import { notFound } from './controllers/notFoundController'
import { globalErrorHandler } from './controllers/errorController'

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.all('*', notFound)
app.use(globalErrorHandler)
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
