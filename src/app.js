import express from 'express'

import livroRoutes from './routes/livroRoutes.js'
import camisetaRoutes from './routes/camisetaRoutes.js'
import webRoutes from './routes/webRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

import logMiddleware from './middlewares/logMiddleware.js'
import routeNotFoundMiddleware from './middlewares/routeNotFoundMiddleware.js'
import globalErrorHandler from './middlewares/errorMiddleware.js'
import authMiddleware from './middlewares/authMiddleware.js'
import checkRole from './middlewares/permissionsMiddleware.js' // IMPORTANDO O MIDDLEWARE DE PERMISSÕES

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

app.get('/', (req, res) => {
    res.json({ message: "API online e rodando no Render!" });
});

// ROTAS DESPROTEGIDAS (ACESSÍVEIS SEM AUTENTICAÇÃO)
app.use('/view', webRoutes)
app.use('/api/auth', authRoutes)
// ROTAS DA API PROTEGIDAS POR AUTENTICAÇÃO E AUTORIZAÇÃO
app.use('/api/users', authMiddleware, checkRole('admin'), userRoutes)
app.use('/api/livros', authMiddleware, checkRole('admin'), livroRoutes)
app.use('/api/camisetas', authMiddleware, checkRole('admin'), camisetaRoutes)

app.use(routeNotFoundMiddleware)
app.use(globalErrorHandler)

app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'))

export default app