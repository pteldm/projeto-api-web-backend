import { 
    servicoCriarLivro, 
    servicoListarLivros, 
    servicoListarLivroId, 
    servicoAtualizarLivro, 
    servicoAtualizarParcialLivro, 
    servicoDeletarLivro 
} from '../services/livroService.js'

export const criarLivro = async (req, res, next) => {
    // extraindo os dados da requisição http
    const livroData = req.body
    
    try{
        // criando um novo pet -> Service
        const novoLivro = await servicoCriarLivro(livroData)
        res.status(201).json(novoLivro)
    }catch (error) {
        next(error)
    }
}

export const listarLivros = async (req, res, next) => {
    try {
        // Chama o serviço e aguarda a lista de pets
        const listaDeLivros = await servicoListarLivros()
        // Envia a lista como resposta com status 200
        res.status(200).json(listaDeLivros)
    } catch (error) {
        next(error)
    }
}

export const listarLivroId = async (req, res, next) => {
    try{
        const livro = await servicoListarLivroId(req.params.id)
        res.status(200).json(livro)
    }catch (error) {
        if (error.message === "Livro não encontrado") {
            error.statusCode = 404
        }
        next(error)
    }
}

export const atualizaLivro = async (req, res, next) => {
    
    try{
        const livroData = { id: req.params.id, ...req.body }
        // controller -> service
        const livroAtualizado = await servicoAtualizarLivro(livroData)
        res.status(200).json(livroAtualizado)
    } catch(error){
        if (error.message === "Livro não encontrado") {
            error.statusCode = 404
        }
        next(error)
    }
}

export const atualizaParcialLivro = async (req, res, next) => {
    try{
        const livroData = { id: req.params.id, ...req.body }
        // controller -> service
        const livroAtualizadoParcial = await servicoAtualizarParcialLivro(livroData)
        res.status(200).json(livroAtualizadoParcial)
    } catch(error){
        if (error.message === "Livro não encontrado") {
            error.statusCode = 404
        }
        next(error)
    }
}

export const deletaLivro = async (req, res, next) => {
    
    try{
        const {id} = req.params
        // controller -> service
        await servicoDeletarLivro(id)
        res.status(200).send()
    } catch(error){
        if (error.message === "Livro não encontrado") {
            error.statusCode = 404
        }
        next(error)
    }
}