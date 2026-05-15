import {
    repositorioCriarCamiseta,
    repositorioListarCamisetas,
    repositorioListarCamisetaId,
    repositorioAtualizarCamiseta,
    repositorioAtualizarCamisetaParcial,
    repositorioDeletarCamiseta
} from '../repositories/camisetaRepository.js'

export const servicoCriarCamiseta = async (camisetaData) => {
    const {tamanho, cor, marca, tipo} = camisetaData
    const novaCamiseta = await repositorioCriarCamiseta({tamanho, cor, marca, tipo})
    return novaCamiseta
}

export const servicoListarCamisetas = async () => {
    const listaDeCamisetas = await repositorioListarCamisetas()
    return listaDeCamisetas
}

export const servicoListarCamisetaId = async (id) => {
    const camiseta = await repositorioListarCamisetaId(id)
    return camiseta
}

export const servicoAtualizarCamiseta = async (camisetaData) => {
    const {id, tamanho, cor, marca, tipo} = camisetaData
    const camisetaAtualizada = await repositorioAtualizarCamiseta({id, tamanho, cor, marca, tipo})
    return camisetaAtualizada
}

export const servicoAtualizarCamisetaParcial = async (camisetaData) => {
    const {id, tamanho, cor, marca, tipo} = camisetaData
    
    const dadosLimpos = { id }
    if (tamanho !== undefined) dadosLimpos.tamanho = tamanho
    if (cor !== undefined) dadosLimpos.cor = cor
    if (marca !== undefined) dadosLimpos.marca = marca
    if (tipo !== undefined) dadosLimpos.tipo = tipo
    
    const camisetaAtualizadaParcial = await repositorioAtualizarCamisetaParcial(dadosLimpos)
    return camisetaAtualizadaParcial
}

export const servicoDeletarCamiseta = async (id) => {
    await repositorioDeletarCamiseta(id)

}