import { validationResult } from 'express-validator'

// Middleware para capturar e enviar os erros
export const verificaErros = (req, res, next) => {
        const erros = validationResult(req)
        if (!erros. isEmpty ()) {
            return res.status(400).json({ erros: erros. array() })
        }
        next()
    }