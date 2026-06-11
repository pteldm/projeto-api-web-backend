import { Router } from 'express'
import { 
    criarLivro, 
    listarLivros, 
    listarLivroId, 
    atualizaLivro, 
    atualizaParcialLivro, 
    deletaLivro 
} from '../controllers/livroController.js'
import { 
    regrasValidacaoCriarLivro, 
    regrasValidacaoAtualizarParcialLivro 
} from '../validators/livroValidator.js'

const router = Router()

/**
 * @swagger
 * /api/livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: "A Guerra dos Tronos"
 *             autor: "George R. R. Martin"
 *             paginas: 600
 *             genero: "Fantasia"
 *     responses:
 *       '201':
 *         description: Livro criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 */
router.post('/', regrasValidacaoCriarLivro, criarLivro)

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Retorna a lista de todos os livros
 *     tags: [Livros]
 *     responses:
 *       '200':
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/', listarLivros)

/**
 * @swagger
 * /api/livros/{id}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     responses:
 *       '200':
 *         description: Livro encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       '404':
 *         description: Livro não encontrado.
 */
router.get('/:id', listarLivroId)

/**
 * @swagger
 * /api/livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             nome: "O Senhor dos Anéis - A Sociedade do Anel"
 *             autor: "J.R.R. Tolkien"
 *             paginas: 450
 *             genero: "Fantasia"
 *     responses:
 *       '200':
 *         description: Livro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '404':
 *         description: Livro não encontrado.
 */
router.put('/:id', regrasValidacaoCriarLivro, atualizaLivro)

/**
 * @swagger
 * /api/livros/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um livro existente pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LivroParcial'
 *     responses:
 *       '200':
 *         description: Livro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '404':
 *         description: Livro não encontrado.
 */
router.patch('/:id', regrasValidacaoAtualizarParcialLivro,atualizaParcialLivro)

/**
 * @swagger
 * /api/livros/{id}:
 *   delete:
 *     summary: Deleta um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     responses:
 *       '204':
 *         description: Livro deletado com sucesso.
 *       '404':
 *         description: Livro não encontrado.
 */
router.delete('/:id', deletaLivro)

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - nome
 *         - autor
 *         - paginas
 *         - genero
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente pelo banco de dados
 *         nome:
 *           type: string
 *           description: O nome do livro
 *         autor:
 *           type: string
 *           description: O autor do livro
 *         paginas:
 *           type: integer
 *           description: A quantidade de páginas do livro
 *         genero:
 *           type: string
 *           description: O gênero literário do livro
 *     LivroParcial:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         autor:
 *           type: string
 *         paginas:
 *           type: integer
 *         genero:
 *           type: string
 */

export default router