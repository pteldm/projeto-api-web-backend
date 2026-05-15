import { 
    repositorioCriarLivro, 
    repositorioListarLivros, 
    repositorioListarLivroId,
    repositorioAtualizarLivro, 
    repositorioAtualizarParcialLivro, 
    repositorioDeletarLivro 
} from '../repositories/livroRepository.js'

export const servicoCriarLivro = async (livroData) => {

    // regra de negócio: os pets devem ter apenas esses campos
    const { nome, autor, paginas, genero  } = livroData
    //service -> repositório
    const novoLivro = await repositorioCriarLivro({ nome, autor, paginas, genero })

    return novoLivro
}

export const servicoListarLivros = async () => {
    // service -> repository
    const listaLivros = await repositorioListarLivros()
    return listaLivros
}

export const servicoListarLivroId = async (id) => {
    // service -> repositório
    const listarLivroId = await repositorioListarLivroId(id)
    return listarLivroId
}

export const servicoAtualizarLivro = async (livroData) => {
    // capturando os campos de interesse do petData que contém a requisição toda
    const { id, nome, autor, paginas, genero } = livroData
    // service -> repository
    const livroAtualizado = await repositorioAtualizarLivro({ id, nome, autor, paginas, genero })
    
    return livroAtualizado
}

export const servicoAtualizarParcialLivro = async (livroData) => {
    const { id, nome, autor, paginas, genero } = livroData
    
    const dadosLimpos = { id }
    if (nome !== undefined) dadosLimpos.nome = nome
    if (autor !== undefined) dadosLimpos.autor = autor
    if (paginas !== undefined) dadosLimpos.paginas = paginas
    if (genero !== undefined) dadosLimpos.genero = genero

    // service -> repository
    const livroAtualizadoParcial = await repositorioAtualizarParcialLivro(dadosLimpos)
    
    return livroAtualizadoParcial
}

export const servicoDeletarLivro = async (id) => {
    const deletarPet = await repositorioDeletarLivro(id)
    return deletarPet
}