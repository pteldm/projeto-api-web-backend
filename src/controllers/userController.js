import {
    serviceNovousuario,
    serviceAtualizarUsuario,
    serviceDeletarUsuario
} from '../services/userService.js'

export const criarUsuario = async (req, res, next) => {
    const userData = req.body
    try{
        const novoUsuario = await serviceNovousuario(userData)
        res.status(201).json(novoUsuario)
    } catch(error){
        next(error)
    }
}

export const atualizarUsuario = async (req, res, next) => {
    try{
        const userData = { id: req.params.id, ...req.body }
        const usuarioAtualizado = await serviceAtualizarUsuario(userData)
        res.status(200).json(usuarioAtualizado)
    } catch(error){
        next(error)
    }
}

export const deletarUsuario = async (req, res, next) => {
    const userData = { id: req.params.id }
    try{
        await serviceDeletarUsuario(userData)
        res.status(204).send()
    } catch(error){
        next(error)
    }
}