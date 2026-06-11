import { getDB } from '../config/mongo.js'
import { ObjectId } from 'mongodb'

export const repositorioCriarLivro = async (livroData) => {
    const db = getDB()
    const result = await db.collection('livros').insertOne(livroData)
    return { _id: result.insertedId, ...livroData }
}

export const repositorioListarLivros = async () => {
    const db = getDB()
    return await db.collection('livros').find().toArray()
}

export const repositorioListarLivroId = async (id) => {
    const db = getDB()
    const livro = await db.collection('livros').findOne({ _id: new ObjectId(id) })
    if (!livro) {
        throw new Error("Livro não encontrado")
    }
    return livro
}

export const repositorioAtualizarLivro = async(livroData) => {
    const db = getDB()
    const { id, ...dadosAtualizacao } = livroData
    const result = await db.collection('livros').findOneAndReplace(
        { _id: new ObjectId(id) },
        dadosAtualizacao,
        { returnDocument: 'after' }
    )
    if (!result) {
        throw new Error("Livro não encontrado")
    }
    return result
}

export const repositorioAtualizarParcialLivro = async(livroData) => {
    const db = getDB()
    const { id, ...dadosAtualizacao } = livroData
    const result = await db.collection('livros').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: dadosAtualizacao },
        { returnDocument: 'after' }
    )
    if (!result) {
        throw new Error("Livro não encontrado")
    }
    return result
}

export const repositorioDeletarLivro = async (id) => {
    const db = getDB()
    const result = await db.collection('livros').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
        throw new Error("Livro não encontrado")
    }
}