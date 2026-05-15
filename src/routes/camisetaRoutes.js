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

router.post('/', regrasValidacaoCriarCamiseta, criarCamiseta)
router.get('/', listarCamiseta)
router.get('/:id', listarCamisetaId)
router.put('/:id', regrasValidacaoCriarCamiseta, atualizaCamiseta)
router.patch('/:id', regrasValidacaoAtualizarParcialCamiseta, atualizaParcialCamiseta)
router.delete('/:id', deletaCamiseta)

export default router