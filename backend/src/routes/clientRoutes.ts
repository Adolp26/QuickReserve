import { Router } from 'express';
import clientController from '../controllers/ClientController';

const router = Router();

// Defina as rotas
router.post('/clientes', clientController.register); // Verifique se esta linha está correta
router.get('/clientes/:id', clientController.getClient);
router.put('/clientes/:id', clientController.updateClient);
router.delete('/clientes/:id', clientController.deleteClient);

export default router;