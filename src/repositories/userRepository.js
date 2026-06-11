import { getDB } from '../config/mongo.js'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export const repositorioCriaUsuario = async (login, senha, role = 'user') => {
    const db = getDB()
    const hash = await bcrypt.hash(senha, 10)
    const novoUsuario = { login, senha: hash, role }
    
    const result = await db.collection('usuarios').insertOne(novoUsuario)
    return { _id: result.insertedId, ...novoUsuario }
}

export const repositorioAtualizaUsuario = async (id, login, senha, role) => {
    const db = getDB()
    const hash = await bcrypt.hash(senha, 10)
    
    // Usamos $set do MongoDB: se role for undefined, ele não será modificado (mantém o atual)
    const updateDoc = { login, senha: hash }
    if (role) updateDoc.role = role

    const result = await db.collection('usuarios').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateDoc },
        { returnDocument: 'after' }
    )

    if (!result) {
        throw new Error("Usuário não encontrado")
    }
    return result
}

export const repositorioDeletaUsuario = async (id) => {
    const db = getDB()
    const result = await db.collection('usuarios').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
        throw new Error("Usuário não encontrado")
    }
}

export const buscarUsuario = async (login, senha) => {
    const db = getDB()
    const usuario = await db.collection('usuarios').findOne({ login })
    if (!usuario) {
        throw new Error("Credenciais inválidas")
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if(!senhaValida) {
        throw new Error("Credenciais inválidas")
    }
    
    return usuario
}