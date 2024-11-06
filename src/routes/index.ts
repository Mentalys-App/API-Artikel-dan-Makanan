import { Router } from 'express'
import articleRouter from './articleRouter'
import { notFound } from '../middleware/error/notFoundController'
import { globalErrorHandler } from '../middleware/error/errorController'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'

const app = Router()
// Load YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', articleRouter)
app.use('*', notFound)
app.use(globalErrorHandler)
export default app
