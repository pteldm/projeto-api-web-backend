import db from '../config/database.js'

export const repositorioCriarCamiseta = async (camisetaData) => {
    const ultimaCamiseta = db.data.camisetas[db.data.camisetas.length - 1]
    const novoId = ultimaCamiseta ? ultimaCamiseta.id + 1 : 1
    const novaCamiseta = { id: novoId, ...camisetaData }
    db.data.camisetas.push(novaCamiseta)
    await db.write()
    return novaCamiseta
}

export const repositorioListarCamisetas = async () => {
    const camisetas = db.data.camisetas
    return camisetas
}

export const repositorioListarCamisetaId = async (id) => {
    const camiseta = db.data.camisetas.find(p => p.id === Number(id))
    if (!camiseta) {
        throw new Error("Camiseta não encontrada")
    }
    return camiseta
}

export const repositorioAtualizarCamiseta = async (camisetaData) => {
    const index = db.data.camisetas.findIndex(p => p.id === Number(camisetaData.id))
    if (index === -1) {
        throw new Error("Camiseta não encontrada")
    }
    const {id, ...dadosAtualizacao} = camisetaData
    const camisetaAtualizada = {id: db.data.camisetas[index].id, ...dadosAtualizacao}
    db.data.camisetas[index] = camisetaAtualizada
    await db.write()
    return camisetaAtualizada
}

export const repositorioAtualizarCamisetaParcial = async (camisetaData) => {
    const index = db.data.camisetas.findIndex(p => p.id === Number(camisetaData.id))
    if (index === -1) {
        throw new Error("Camiseta não encontrada")
    }
    const camisetaDoBanco = db.data.camisetas[index]
    const {id, ...dadosAtualizacao} = camisetaData
    const camisetaAtualizadaParcial = {...camisetaDoBanco, ...dadosAtualizacao}
    db.data.camisetas[index] = camisetaAtualizadaParcial
    await db.write()
    return camisetaAtualizadaParcial
}

export const repositorioDeletarCamiseta = async (id) => {
    const index = db.data.camisetas.findIndex(p => p.id === Number(id))
    if (index === -1) {
        throw new Error("Camiseta não encontrada")
    }
    db.data.camisetas.splice(index, 1)
    await db.write()

}