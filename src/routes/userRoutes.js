import { Router } from 'express'
import {
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
} from '../controllers/userController.js'
import {
    validaUsuario
} from '../validators/userValidator.js'
const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             login: "joao.silva"
 *             senha: "senha123"
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '401':
 *         description: Token de autenticação não fornecido ou inválido.
 *       '403':
 *         description: Acesso negado. Permissões insuficientes.
 */
router.post('/', validaUsuario, criarUsuario)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente pelo ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             login: "joao.silva_atualizado"
 *             senha: "novasenha321"
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '401':
 *         description: Token de autenticação não fornecido ou inválido.
 *       '403':
 *         description: Acesso negado. Permissões insuficientes.
 *       '404':
 *         description: Usuário não encontrado.
 */
router.put('/:id', validaUsuario, atualizarUsuario)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       '204':
 *         description: Usuário deletado com sucesso.
 *       '401':
 *         description: Token de autenticação não fornecido ou inválido.
 *       '403':
 *         description: Acesso negado. Permissões insuficientes.
 *       '404':
 *         description: Usuário não encontrado.
 */
router.delete('/:id', deletarUsuario)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - login
 *         - senha
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente pelo banco de dados
 *         login:
 *           type: string
 *           description: Login do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário
 */
export default router;