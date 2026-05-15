import {
    servicoCriarCamiseta,
    servicoListarCamisetas,
    servicoListarCamisetaId,
    servicoAtualizarCamiseta,
    servicoAtualizarCamisetaParcial,
    servicoDeletarCamiseta
} from '../services/camisetaService.js'

export const criarCamiseta = async (req, res, next) => {
    const camisetaData = req.body
    try{
        const novaCamiseta = await servicoCriarCamiseta(camisetaData)
        res.status(201).json(novaCamiseta)
    } catch(error){
        next(error)
    }
}

export const listarCamiseta = async (req, res, next) => {
    try{
        const listaDeCamiseta = await servicoListarCamisetas()
        res.status(200).json(listaDeCamiseta)
    } catch(error){
        next(error)
    }
}

export const listarCamisetaId = async (req, res, next) => {
    const {id} = req.params
    try{
        const listaCamisetaPorId = await servicoListarCamisetaId(id)
        res.status(200).json(listaCamisetaPorId)
    } catch(error){
        next(error)
    }
}

export const atualizaCamiseta = async (req, res, next) => {
    const camisetaData = { id: req.params.id, ...req.body }
    try{
        const camisetaAtualizada = await servicoAtualizarCamiseta(camisetaData)
        res.status(200).json(camisetaAtualizada)
    } catch(error){
        next(error)
    }
}

export const atualizaParcialCamiseta = async (req, res, next) => {
    const camisetaData = { id: req.params.id, ...req.body }
    try{
        const camisetaAtualizadaParcial = await servicoAtualizarCamisetaParcial(camisetaData)
        res.status(200).json(camisetaAtualizadaParcial)
    } catch(error){
        next(error)
    }
}

export const deletaCamiseta = async (req, res, next) => {
    const {id} = req.params
    try{
        await servicoDeletarCamiseta(id)
        res.status(204).send()
    } catch(error){
        next(error)
    }

}