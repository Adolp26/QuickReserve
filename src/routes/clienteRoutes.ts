import { Router } from 'express';
import { clienteController } from '../controllers/clienteController';

const router = Router();

router.post('/', clienteController.cadastrar);
router.get('/', clienteController.listar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.deletar);

export default router;