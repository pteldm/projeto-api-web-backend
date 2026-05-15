import { body } from 'express-validator'
import { verificaErros } from '../middlewares/validatorMiddleware.js'

    // regras para criação de um pet
    export const regrasValidacaoCriarLivro = [
        body('nome')
            .trim()
            .notEmpty().withMessage('O nome do livro é obrigatório' ),
        body('autor')
            .trim()
            .notEmpty().withMessage('O nome do autor é obrigatório'),
        body('paginas')
            .notEmpty().withMessage('A quantidade de páginas é obrigatória')
            .isInt({ min : 1}).withMessage ('A quantidade de páginas deve ser maior que 0'),
        body('genero')
            .notEmpty().withMessage('O gênero é obrigatório')
            .isString().withMessage('O gênero deve ser um texto')
            .isIn(['Aventura','Romance', 'Fantasia', 'Ficção Científica', 'Terror', 'Drama']).withMessage('Os gêneros aceitos são: Aventura, Romance, Fantasia, Ficção Científica, Terror e Drama'),
        verificaErros
    ]

    // regras para a atualização parcial de um pet
    export const regrasValidacaoAtualizarParcialLivro = [
        body('nome')
            .trim()
            .isString().withMessage('O nome deve ser uma string')
            .optional(),
        body('autor')
            .trim()
            .isString().withMessage('O autor deve ser uma string')
            .optional(),
        body('paginas')
            .isInt({ min : 1}).withMessage ('A quantidade de páginas deve ser um número inteiro maior que zero')
            .optional(),
        body('genero')
            .isString().withMessage('O gênero deve ser um texto')    
            .isIn(['Aventura','Romance', 'Fantasia', 'Ficção Científica', 'Terror', 'Drama']).withMessage('Os gêneros aceitos são: Aventura, Romance, Fantasia, Ficção Científica, Terror e Drama')
            .optional(),
        verificaErros
    ]