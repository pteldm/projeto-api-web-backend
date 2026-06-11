import { body } from "express-validator";
import { verificaErros } from "../middlewares/validatorMiddleware.js";

export const validaUsuario = [
    body('login')
        .isString()
        .isLength({ min: 3, max: 100 })
        .withMessage('Login é obrigatório e deve ser uma string.'),
    body('senha')
        .isLength({ min: 4, max: 100 })
        .withMessage('Senha é obrigatória e deve ter entre 6 e 100 caracteres.'),
    body('role')
        .isIn(['user','admin'])
        .withMessage('Role é obrigatório'),
    verificaErros
]