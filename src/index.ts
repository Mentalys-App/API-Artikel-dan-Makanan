import express, { type Application } from 'express'
import 'dotenv/config'

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
