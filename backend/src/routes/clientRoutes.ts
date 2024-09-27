import { Router } from 'express';
import clientController from '../controllers/ClientController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Importar o middleware

const router = Router();

// Defina as rotas
router.post('/clientes', clientController.register); // Registro
router.post('/clientes/login', clientController.login); // Login
router.get('/clientes/:id', authMiddleware(['client']), clientController.getClient); // Proteger rota para clientes
router.put('/clientes/:id', authMiddleware(['client']), clientController.updateClient); // Proteger rota para clientes
router.delete('/clientes/:id', authMiddleware(['client']), clientController.deleteClient); // Proteger rota para clientes

export default router;
