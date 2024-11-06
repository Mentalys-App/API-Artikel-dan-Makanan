import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mentalys Article API',
      version: '1.0.0',
      description: 'API for managing mental health articles'
    }
  },
  apis: ['./src/routes/index.ts']
}

export const specs = swaggerJsdoc(options)
