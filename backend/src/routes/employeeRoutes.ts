import { Router } from 'express';
import employeeController from '../controllers/EmployeeController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Importar o middleware

const router = Router();

// Defina as rotas
router.post('/employees', employeeController.register); // Registro
router.post('/employees/login', employeeController.login); // Login
router.get('/employees/:id', authMiddleware(['employee']), employeeController.getEmployee); // Proteger rota para employees
router.put('/employees/:id', authMiddleware(['employee']), employeeController.updateEmployee); // Proteger rota para employees
router.delete('/employees/:id', authMiddleware(['employee']), employeeController.deleteEmployee); // Proteger rota para employees

export default router;
