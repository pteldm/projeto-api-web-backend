import { body } from "express-validator"
import { verificaErros } from "../middlewares/validatorMiddleware.js"

export const regrasValidacaoCriarCamiseta = [
    body('tamanho')
        .notEmpty().withMessage('O tamanho da camiseta é obrigatório')
        .trim()
        .isString().withMessage('O tamanho deve ser uma string')
        .isIn(['P', 'M', 'G', 'GG', 'XG']).withMessage('Os tamanhos aceitos são: P, M, G, GG e XG'),
    body('cor')
        .notEmpty().withMessage('A cor é obrigatória')
        .trim()
        .isString().withMessage('A cor deve ser uma string'),
    body('marca')
        .notEmpty().withMessage('A marca é obrigatória')
        .trim()
        .isString().withMessage('A marca deve ser uma string'),
    body('tipo')
        .notEmpty().withMessage('O tipo é obrigatório')
        .trim()
        .isString().withMessage('O tipo deve ser uma string')
        .isIn(['T-shirt', 'Regata','Polo']).withMessage('Os tipos aceitos são: T-shirt, Regata e Polo'),
    verificaErros
]

export const regrasValidacaoAtualizarParcialCamiseta = [
    body('tamanho')
        .optional()
        .trim()
        .isString().withMessage('O tamanho deve ser uma string')
        .isIn(['P', 'M', 'G', 'GG', 'XG']).withMessage('Os tamanhos aceitos são: P, M, G, GG e XG'),
    body('cor')
        .optional()
        .trim()
        .isString().withMessage('A cor deve ser uma string'),
    body('marca')
        .optional()
        .trim()
        .isString().withMessage('A marca deve ser uma string'),
    body('tipo')
        .optional()
        .trim()
        .isString().withMessage('O tipo deve ser uma string')
        .isIn(['T-shirt', 'Regata','Polo']).withMessage('Os tipos aceitos são: T-shirt, Regata e Polo'),
    verificaErros

]