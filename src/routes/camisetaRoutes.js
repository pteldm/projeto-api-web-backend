import { Router } from 'express'
import {
    criarCamiseta,
    listarCamiseta,
    listarCamisetaId,
    atualizaCamiseta,
    atualizaParcialCamiseta,
    deletaCamiseta
} from '../controllers/camisetasController.js'
import {
    regrasValidacaoCriarCamiseta,
    regrasValidacaoAtualizarParcialCamiseta
} from '../validators/camisetaValidator.js'

const router = Router()

/**
 * @swagger
 * /api/camisetas:
 *   post:
 *     summary: Cria uma nova camiseta
 *     tags: [Camisetas]
 *     parameters:
 *       - in: header
 *         tamanho: "M"
 *         cor: "Azul" 
 *         marca: "Nike"
 *         tipo: "Esportiva"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tamanho: "M"
 *             cor: "Azul"
 *             marca: "Nike"
 *             tipo: "Esportiva"
 *     responses:
 *       '201':
 *         description: Camiseta criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 */


router.post('/', regrasValidacaoCriarCamiseta, criarCamiseta)

/**
 * @swagger
 * /api/camisetas:
 *   get:
 *     summary: Retorna a lista de todas as camisetas
 *     tags: [Camisetas]
 *     responses:
 *       '200':
 *         description: Lista de camisetas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Camiseta'
 */

router.get('/', listarCamiseta)

/**
 * @swagger
 * /api/camisetas/{id}:
 *   get:
 *     summary: Retorna uma camiseta pelo ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da camiseta
 *     responses:
 *       '200':
 *         description: Camiseta encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       '404':
 *         description: Camiseta não encontrada.
 */
router.get('/:id', listarCamisetaId)

/**
 * @swagger
 * /api/camisetas/{id}:
 *   put:
 *     summary: Atualiza uma camiseta existente pelo ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da camiseta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Camiseta'
 *           example:
 *             tamanho: "G"
 *             cor: "Vermelho"
 *             marca: "Adidas"
 *             tipo: "T-shirt"
 *     responses:
 *       '200':
 *         description: Camiseta atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '404':
 *         description: Camiseta não encontrada.
 */
router.put('/:id', regrasValidacaoCriarCamiseta, atualizaCamiseta)

/**
 * @swagger
 * /api/camisetas/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma camiseta existente pelo ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da camiseta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CamisetaParcial'
 *     responses:
 *       '200':
 *         description: Camiseta atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camiseta'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '404':
 *         description: Camiseta não encontrada.
 */
router.patch('/:id', regrasValidacaoAtualizarParcialCamiseta, atualizaParcialCamiseta)

/**
 * @swagger
 * /api/camisetas/{id}:
 *   delete:
 *     summary: Deleta uma camiseta pelo ID
 *     tags: [Camisetas]
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da camiseta
 *     responses:
 *       '204':
 *         description: Camiseta deletada com sucesso.
 *       '404':
 *         description: Camiseta não encontrada.
 */
router.delete('/:id', deletaCamiseta)

/**
 * @swagger
 * components:
 *   schemas:
 *     Camiseta:
 *       type: object
 *       required:
 *         - tamanho
 *         - cor
 *         - marca
 *         - tipo
 *       properties:
 *         id:
 *           type: string
 *           description: ID da camiseta
 *         tamanho:
 *           type: string
 *           description: Tamanho da camiseta (P, M, G, GG)
 *         cor:
 *           type: string
 *           description: Cor da camiseta
 *         marca:
 *           type: string
 *           description: Marca da camiseta
 *         tipo:
 *           type: string
 *           description: Tipo da camiseta
 *     CamisetaParcial:
 *       type: object
 *       properties:
 *         tamanho:
 *           type: string
 *           description: Tamanho da camiseta (P, M, G, GG)
 *         cor:
 *           type: string
 *           description: Cor da camiseta
 *         marca:
 *           type: string
 *           description: Marca da camiseta
 *         tipo:
 *           type: string
 *           description: Tipo da camiseta
 */

export default router