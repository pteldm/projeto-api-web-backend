import 'dotenv/config'
import {
    buscarUsuario,
} from '../repositories/userRepository.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const serviceLoginUsuario = async(userData) => {
    
    const {login, senha} = userData
    const usuario = await buscarUsuario(login, senha)
    if(!usuario){
        const erro = new Error('Credenciais inválidas')
        erro.statusCode = 401
        throw erro
    }

    const payload = {
        id: usuario.id,
        login: usuario.login,
        role: usuario.role
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
    
    return token
}