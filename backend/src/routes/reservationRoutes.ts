import { Router } from 'express';
import ReservationController from '../controllers/ReservationController'; // Ajuste o caminho conforme necessário
import { authMiddleware } from '../middlewares/authMiddleware'; // Importar o middleware

const router = Router();

// Rota para criar uma nova reserva (pode não precisar de autenticação dependendo do seu fluxo)
router.post('/reservations', authMiddleware(['client']), ReservationController.createReservation); // Proteger rota para criar reservas

// Rota para obter todas as reservas (pode não precisar de autenticação dependendo do seu fluxo)
router.get('/reservations', authMiddleware(['admin']), ReservationController.getAllReservations); // Proteger rota para administradores

// Rota para obter uma reserva específica pelo ID
router.get('/reservations/:id', authMiddleware(['client', 'admin']), ReservationController.getReservationById); // Proteger rota para clientes e administradores

// Rota para obter todas as reservas de um cliente pelo ID do cliente
router.get('/reservations/clients/:clientId', authMiddleware(['client']), ReservationController.getAllReservationsByClientId); // Nova rota

// Rota para atualizar uma reserva existente
router.put('/reservations/:id', authMiddleware(['client']), ReservationController.updateReservation); // Proteger rota para clientes

// Rota para cancelar uma reserva
router.patch('/reservations/:id/cancel', authMiddleware(['client']), ReservationController.cancelReservation); // Nova rota para cancelar

// Rota para concluir uma reserva
router.patch('/reservations/:id/done', authMiddleware(['admin']), ReservationController.completeReservation); // Proteger rota para administradores

// Rota para deletar uma reserva
router.delete('/reservations/:id', authMiddleware(['client', 'admin']), ReservationController.deleteReservation); // Proteger rota para clientes e administradores

export default router;
