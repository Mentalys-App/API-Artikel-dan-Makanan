import 'dotenv/config'
import { MONGO_URI } from './config'
import mongoose from 'mongoose'
import web from './middleware/web'
const dbUrl: string = MONGO_URI

// Connect to MongoDB
mongoose.connect(dbUrl)
const connection = mongoose.connection
connection.once('open', function () {
  console.log('Connection to MongoDB established succesfully!')
})

// Start web server
const port: number = Number(process.env.PORT) || 3000
web.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
