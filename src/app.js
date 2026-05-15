import express from 'express'

import livroRoutes from './routes/livroRoutes.js'
import camisetaRoutes from './routes/camisetaRoutes.js'
import webRoutes from './routes/webRoutes.js'

import logMiddleware from './middlewares/logMiddleware.js'
import routeNotFoundMiddleware from './middlewares/routeNotFoundMiddleware.js'
import globalErrorHandler from './middlewares/errorMiddleware.js'

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())
app.use(logMiddleware)

app.use('/api/livros', livroRoutes)
app.use('/api/camisetas', camisetaRoutes)
app.use('/view', webRoutes)

app.use(routeNotFoundMiddleware)
app.use(globalErrorHandler)

app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'))

export default app