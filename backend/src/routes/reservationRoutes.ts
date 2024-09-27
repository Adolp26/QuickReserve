import { Router } from 'express';
import ReservationController from '../controllers/ReservationController'; // Ajuste o caminho conforme necessário

const router = Router();

// Rota para criar uma nova reserva
router.post('/reservations', ReservationController.createReservation);

// Rota para obter todas as reservas
router.get('/reservations', ReservationController.getAllReservations);

// Rota para obter uma reserva específica pelo ID
router.get('/reservations/:id', ReservationController.getReservationById); // Corrigido para incluir o ":" antes do "id"

// Rota para obter todas as reservas de um cliente pelo ID do cliente
router.get('/reservations/clients/:clientId', ReservationController.getAllReservationsByClientId); // Nova rota

// Rota para atualizar uma reserva existente
router.put('/reservations/:id', ReservationController.updateReservation);

// Rota para cancelar uma reserva
router.patch('/reservations/:id/cancel', ReservationController.cancelReservation); // Nova rota para cancelar

// Rota para concluir uma reserva
router.patch('/reservations/:id/done', ReservationController.completeReservation); // Nova rota para concluir

// Rota para deletar uma reserva
router.delete('/reservations/:id', ReservationController.deleteReservation);

export default router;
