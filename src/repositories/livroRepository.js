import db from '../config/database.js'

export const repositorioCriarLivro = async (livroData) => {

    const ultimoLivro = db.data.livros[db.data.livros.length - 1]
    const novoId = ultimoLivro ? ultimoLivro.id + 1 : 1
    
    const novoLivro = { id: novoId, ...livroData }

    // O db já foi lido na inicialização (database.js), não é necessário ler de novo.

    // adicionando o novo pet no banco de dados
    db.data.livros.push(novoLivro)

    // escrevendo o novo pet no banco de dados
    await db.write()
    
    return novoLivro
}

export const repositorioListarLivros = async () => {
    const livros = db.data.livros
    return livros
}

export const repositorioListarLivroId = async (id) => {
    const livro = db.data.livros.find(p => p.id === Number(id))
    if (!livro) {
        throw new Error("Livro não encontrado")
    }
    return livro
}

export const repositorioAtualizarLivro = async(livroData) => {
    // buscando id do livro
    const index = db.data.livros.findIndex(p => p.id === Number(livroData.id))
    if (index === -1) {
        throw new Error("Livro não encontrado")
    }
    
    // Removemos o id dos dados recebidos para garantir que o id original não seja afetado
    const { id, ...dadosAtualizacao } = livroData

    // Inicializando o livro atualizado com os novos dados e mantendo o id original do banco
    const livroAtualizado = { id: db.data.livros[index].id, ...dadosAtualizacao }

    db.data.livros[index] = livroAtualizado
    await db.write()
    
    return livroAtualizado
}

export const repositorioAtualizarParcialLivro = async(livroData) => {
    
    const index = db.data.livros.findIndex(p => p.id === Number(livroData.id))
    if (index === -1) {
        throw new Error("Livro não encontrado")
    }

    const livroDoBanco = db.data.livros[index]

    // Removemos o id dos dados recebidos para garantir que o id do banco não seja alterado
    const { id, ...dadosAtualizacao } = livroData

    // Cria um novo objeto mesclando o livro atual com os novos dados
    const livroAtualizadoParcial = { ...livroDoBanco, ...dadosAtualizacao }

    db.data.livros[index] = livroAtualizadoParcial
    await db.write()

    return livroAtualizadoParcial
}

export const repositorioDeletarLivro = async (id) => {
    const index = db.data.livros.findIndex(p => p.id === Number(id))
    if (index === -1) {
        throw new Error("Livro não encontrado")
    }
    db.data.livros.splice(index, 1)
    await db.write()
}