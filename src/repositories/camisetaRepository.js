import { getDB } from '../config/mongo.js'
import { ObjectId } from 'mongodb'

export const repositorioCriarCamiseta = async (camisetaData) => {
    const db = getDB()
    const result = await db.collection('camisetas').insertOne(camisetaData)
    return { _id: result.insertedId, ...camisetaData }
}

export const repositorioListarCamisetas = async () => {
    const db = getDB()
    return await db.collection('camisetas').find().toArray()
}

export const repositorioListarCamisetaId = async (id) => {
    const db = getDB()
    const camiseta = await db.collection('camisetas').findOne({ _id: new ObjectId(id) })
    if (!camiseta) {
        throw new Error("Camiseta não encontrada")
    }
    return camiseta
}

export const repositorioAtualizarCamiseta = async (camisetaData) => {
    const db = getDB()
    const { id, ...dadosAtualizacao } = camisetaData
    const result = await db.collection('camisetas').findOneAndReplace(
        { _id: new ObjectId(id) },
        dadosAtualizacao,
        { returnDocument: 'after' }
    )
    if (!result) {
        throw new Error("Camiseta não encontrada")
    }
    return result
}

export const repositorioAtualizarCamisetaParcial = async (camisetaData) => {
    const db = getDB()
    const { id, ...dadosAtualizacao } = camisetaData
    const result = await db.collection('camisetas').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: dadosAtualizacao },
        { returnDocument: 'after' }
    )
    if (!result) {
        throw new Error("Camiseta não encontrada")
    }
    return result
}

export const repositorioDeletarCamiseta = async (id) => {
    const db = getDB()
    const result = await db.collection('camisetas').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
        throw new Error("Camiseta não encontrada")
    }
}