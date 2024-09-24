import { Router } from 'express';
import { 
    createClient, 
    listClients, 
    getClientById, 
    updateClient, 
    deleteClient 
} from '../controllers/clienteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rotas de clientes
router.post('/clientes', createClient); // Criar cliente
router.get('/clientes', listClients); // Listar clientes
router.get('/clientes/:id', getClientById); // Obter cliente por ID
router.put('/clientes/:id', updateClient); // Atualizar cliente
router.delete('/clientes/:id', deleteClient); // Remover cliente

export default router;
