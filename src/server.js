import app from './app.js'
import 'dotenv/config'
import { connectToDatabase } from './config/mongo.js'

const PORT = process.env.PORT || 3000

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`)
            console.log(`API da loja disponível ${PORT}/api/`)
        })
    })
    .catch((error) => console.error("🔴 Falha ao iniciar o servidor e conectar ao banco:", error))