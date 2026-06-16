import { Router } from 'express'
import {
    loginUsuario
} from '../controllers/authController.js'
import {
    validaUsuario
} from '../validators/userValidator.js'

const router = Router()

/**
 * @swagger
 * /api/auth/user:
 *   post:
 *     summary: Realiza o login de um usuário no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha
 *             properties:
 *               login:
 *                 type: string
 *                 description: Login do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *           example:
 *             login: "joao.silva"
 *             senha: "senha123"
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso. (Retorna o token JWT)
 *       '400':
 *         description: Erro de validação nos dados enviados.
 *       '401':
 *         description: Credenciais inválidas (login ou senha incorretos).
 *       '404':
 *         description: Usuário não encontrado.
 */
router.post('/user', validaUsuario, loginUsuario)

export default router