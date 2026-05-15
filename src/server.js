import app from './app.js'

const PORT = 3000

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando emhttp://localhost:${PORT}`)
    console.log(`🐾 API de Pets disponível em http://localhost:${PORT}/api/livros`)
})