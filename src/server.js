import app from './app.js'
import { connectToDatabase } from './config/mongo.js'

const PORT = 3000

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
            console.log(`API da loja disponível em http://localhost:${PORT}/api/`)
        })
    })
    .catch((error) => console.error("🔴 Falha ao iniciar o servidor e conectar ao banco:", error))