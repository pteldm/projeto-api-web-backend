import express from 'express'
import webLivrosController from '../controllers/webLivrosController.js'
import webCamisetasController from '../controllers/webCamisetasController.js'

const router = express.Router()

/**
 * @swagger
 * /view/livros-view:
 *   get:
 *     summary: Retorna a página web de listagem de livros
 *     tags: [Páginas Web]
 *     responses:
 *       '200':
 *         description: Página HTML com a lista de livros renderizada com sucesso.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/livros-view', webLivrosController)

/**
 * @swagger
 * /view/camisetas-view:
 *   get:
 *     summary: Retorna a página web de listagem de camisetas
 *     tags: [Páginas Web]
 *     responses:
 *       '200':
 *         description: Página HTML com a lista de camisetas renderizada com sucesso.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/camisetas-view', webCamisetasController)

export default router