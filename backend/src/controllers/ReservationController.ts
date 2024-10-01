import { Request, Response } from 'express';
import ReservationService from '../services/ReservationService'; // Ajuste o caminho conforme necessário

class ReservationController {
    async createReservation(req: Request, res: Response) {
        try {
            const { clienteId, mesaId, restauranteId, dataReserva, horaReserva, clienteEmail } = req.body; // Adiciona clienteEmail ao body
            
            // Cria a reserva
            const createdReservation = await ReservationService.createReservation(
                clienteId, 
                mesaId, 
                restauranteId, 
                new Date(dataReserva), 
                horaReserva,
                clienteEmail // Passa o clienteEmail para o Service
            );
    
            res.status(201).json(createdReservation);
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(400).json({ error: errorMessage });
        }
    }

    async getAllReservations(req: Request, res: Response) {
        try {
            const reservations = await ReservationService.getAllReservations();
            res.status(200).json(reservations);
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(400).json({ error: errorMessage });
        }
    }

    async getReservationById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const reservation = await ReservationService.getReservationById(Number(id));
            if (!reservation) {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
            res.status(200).json(reservation);
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(400).json({ error: errorMessage });
        }
    }

    async getAllReservationsByClientId(req: Request, res: Response) {
        const { clienteId } = req.params; // Obtém o ID do cliente dos parâmetros da rota
        try {
            const reservations = await ReservationService.getAllReservationsByClientId(Number(clienteId));
            return res.json(reservations);
        } catch (error) {
            console.error("Erro ao obter reservas:", error);
            return res.status(500).json({ message: "Erro ao obter reservas." });
        }
    }

    async updateReservation(req: Request, res: Response) {
        const { id } = req.params;
        const { clienteId, mesaId, restauranteId, dataReserva, horaReserva } = req.body;
        try {
            const updatedReservation = await ReservationService.updateReservation(Number(id), clienteId, mesaId, restauranteId, new Date(dataReserva), horaReserva);
            res.status(200).json(updatedReservation);
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(400).json({ error: errorMessage });
        }
    }

    async deleteReservation(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await ReservationService.deleteReservation(Number(id));
            res.status(204).send(); // No content
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(400).json({ error: errorMessage });
        }
    }
    async cancelReservation(req: Request, res: Response) {
        const { id } = req.params; // Obtém o ID da reserva dos parâmetros da rota
        try {
            const canceledReservation = await ReservationService.cancelReservation(Number(id));
            return res.json(canceledReservation);
        } catch (error) {
            console.error("Erro ao cancelar reserva:", error);
            return res.status(500).json({ message: "Erro ao cancelar reserva." });
        }
    }

    async completeReservation(req: Request, res: Response) {
        const { id } = req.params; // Obtém o ID da reserva dos parâmetros da rota
        try {
            const completedReservation = await ReservationService.completeReservation(Number(id));
            return res.json(completedReservation);
        } catch (error) {
            console.error("Erro ao concluir reserva:", error);
            return res.status(500).json({ message: "Erro ao concluir reserva." });
        }
    }
}

export default new ReservationController();







// class ReservationController {
//     // Cria uma nova reserva
//     async create(req: Request, res: Response) {
//         const { restauranteId, clienteId, mesaId, dataReserva, horaReserva } = req.body;

//         try {
//             // Converte a string dataReserva para um objeto Date
//             const reservationDate = new Date(dataReserva);
//             const reservationTime = horaReserva; // horaReserva já é uma string no formato TIME

//             // Verifica se a data é válida
//             if (isNaN(reservationDate.getTime())) {
//                 return res.status(400).json({ error: 'Data inválida' });
//             }

//             const reservation = await ReservationService.createReservation(clienteId, mesaId, restauranteId, reservationDate, reservationTime);
//             return res.status(201).json(reservation);
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }

//     // Obtém todas as reservas
//     async getAll(req: Request, res: Response) {
//         try {
//             const reservations = await ReservationService.getAllReservations();
//             return res.status(200).json(reservations);
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }
//     // Obtém todas as reservas com base no id do cliente
//     async getClientReservations(req: Request, res: Response) {
//         const clienteId = parseInt(req.params.clienteId); // Supondo que o ID do cliente é passado como parâmetro da URL

//         try {
//             const reservations = await ReservationService.getAllReservationsByClientId(clienteId);
//             return res.status(200).json(reservations);
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }

//     // Obtém uma reserva específica pelo ID
//     async getById(req: Request, res: Response) {
//         const { id } = req.params;

//         try {
//             const reservation = await ReservationService.getReservationById(parseInt(id, 10));
//             if (!reservation) {
//                 return res.status(404).json({ error: 'Reserva não encontrada' });
//             }
//             return res.status(200).json(reservation);
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }

//     // Atualiza uma reserva
//     async update(req: Request, res: Response) {
//         const { id } = req.params;
//         const { restauranteId, clienteId, mesaId, dataReserva, horaReserva } = req.body;

//         try {
//             const reservationDate = new Date(dataReserva);
//             const reservationTime = horaReserva;

//             if (isNaN(reservationDate.getTime())) {
//                 return res.status(400).json({ error: 'Data inválida' });
//             }

//             const updatedReservation = await ReservationService.updateReservation(parseInt(id, 10), clienteId, mesaId, restauranteId, reservationDate, reservationTime);
//             return res.status(200).json(updatedReservation);
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }

//     // Remove uma reserva
//     async delete(req: Request, res: Response) {
//         const { id } = req.params;

//         try {
//             await ReservationService.deleteReservation(parseInt(id, 10));
//             return res.status(204).send(); // No Content
//         } catch (error) {
//             const errorMessage = (error as Error).message;
//             return res.status(400).json({ error: errorMessage });
//         }
//     }
// }

// export default new ReservationController();
