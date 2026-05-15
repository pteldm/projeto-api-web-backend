import express from 'express'
import webLivrosController from '../controllers/webLivrosController.js'
import webCamisetasController from '../controllers/webCamisetasController.js'

const router = express.Router()

router.get('/livros-view', webLivrosController)
router.get('/camisetas-view', webCamisetasController)

export default router