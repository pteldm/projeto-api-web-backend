import app from './app.js'
import 'dotenv/config'
import { connectToDatabase } from './config/mongo.js'

const PORT = process.env.PORT || 3000



connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            //console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`)
            //console.log(`API da loja disponível em http://localhost:${PORT}/api/livros e http://localhost:${PORT}/api/camisetas`)
            //console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`)
        })
    })
    .catch((error) => console.error("🔴 Falha ao iniciar o servidor e conectar ao banco:", error))