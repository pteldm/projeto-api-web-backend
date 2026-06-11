import { Router } from 'express'
import {
    loginUsuario
} from '../controllers/authController.js'
import {
    validaUsuario
} from '../validators/userValidator.js'

const router = Router()

router.post('/user', validaUsuario, loginUsuario)

export default router