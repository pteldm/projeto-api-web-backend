import {
    serviceLoginUsuario
} from '../services/authService.js'

export const loginUsuario = async (req, res, next) => {
    try{
        const userData = req.body;
        const token = await serviceLoginUsuario(userData)
        return res.status(200).json(token)
    }catch (error) {
        next(error)
    }
}