import ReservationRepository from '../repositories/ReservationRepository'; // Ajuste o caminho conforme necessário
import { sendEmail } from '../utils/emailUtils';
import ClientRepository from '../repositories/ClientRepository';


class ReservationService {
    async createReservation(clienteId: number, mesaId: number, restauranteId: number, dataReserva: Date, horaReserva: string, clienteEmail: string) {
        // Verifica se já existe uma reserva para a mesa na data informada
        const existingReservation = await ReservationRepository.findReservationByMesaAndDate(mesaId, dataReserva);

        if (existingReservation) {
            throw new Error('A mesa já está reservada para o dia especificado.');
        }

        // Verifica se a data está no formato correto
        const reservationDate = new Date(dataReserva); // Converte a string para Date
        const [hour, minute] = horaReserva.split(':'); // Divide a string de hora em partes
        const reservationTime = `${hour}:${minute}:00`; // Formata como TIME

        const reservationData = {
            cliente_id: clienteId,
            mesa_id: mesaId,
            restaurante_id: restauranteId,
            data_reserva: reservationDate,
            hora_reserva: reservationTime,
            status: 'Confirmada',
        };

        const createdReservation = await ReservationRepository.create(reservationData);
        console.log("Reserva criada com sucesso:", createdReservation);

        // Envia o email de confirmação de reserva
        const subject = 'Confirmação de Reserva';
        const text = `
            Confirmação de Reserva

            Sua reserva foi criada com sucesso! 🎉

            Detalhes da Reserva:
            Número da Reserva: ${createdReservation.id}
            Número da Mesa ${createdReservation.mesa_id}
            Data da Reserva: ${createdReservation.data_reserva}
            Hora da Reserva: ${createdReservation.hora_reserva}
            Status: ${createdReservation.status}

            Agradecemos por escolher nosso serviço. Se precisar de ajuda, não hesite em nos contatar!
        `;

        await sendEmail(clienteEmail, subject, text); // Agora você usa o utilitário de email

        return createdReservation;
    }

    async getAllReservationsByClientId(clienteId: number) {
        return await ReservationRepository.findAllByClienteId(clienteId);
    }

    async getAllReservations() {
        console.log("Obtendo todas as reservas...");
        const reservations = await ReservationRepository.findAll();
        return reservations;
    }

    async getReservationById(id: number) {
        console.log(`Obtendo reserva com ID: ${id}`);
        const reservation = await ReservationRepository.findById(id);
        return reservation;
    }

    async updateReservation(id: number, clienteId: number, mesaId: number, restauranteId: number, dataReserva: Date, horaReserva: string) {
        console.log(`Atualizando reserva com ID: ${id}`);
        const reservationTime = horaReserva; // Hora já está em formato correto
        const reservationData = {
            cliente_id: clienteId,
            mesa_id: mesaId,
            restaurante_id: restauranteId,
            data_reserva: dataReserva,
            hora_reserva: reservationTime,
        };

        const updatedReservation = await ReservationRepository.update(id, reservationData);
        console.log("Reserva atualizada com sucesso:", updatedReservation);
        
        return updatedReservation;
    }

    async deleteReservation(id: number) {
        console.log(`Removendo reserva com ID: ${id}`);
        await ReservationRepository.delete(id);
    }

    async cancelReservation(id: number) {
        console.log(`Cancelando reserva com ID: ${id}`);
        
        const reservation = await ReservationRepository.findById(id);
        if (!reservation) {
            throw new Error('Reserva não encontrada.');
        }

        // Busca o cliente pelo ID para enviar email
        const cliente = await ClientRepository.findById(reservation.cliente_id); 
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        const updatedReservation = await ReservationRepository.cancel(id);
        console.log("Reserva cancelada com sucesso:", updatedReservation);

        const subject = 'Cancelamento de Reserva';
        const text = `
            Cancelamento de Reserva

            Sua reserva foi cancelada.

            Detalhes da Reserva:
            Número da Reserva: ${reservation.id}
            Número da Mesa: ${reservation.mesa_id}
            Data da Reserva: ${reservation.data_reserva}
            Hora da Reserva: ${reservation.hora_reserva}

            Se precisar de ajuda, não hesite em nos contatar.
        `;

        await sendEmail(cliente.email, subject, text);

        return updatedReservation;
    }

    async completeReservation(id: number) {
        console.log(`Concluindo reserva com ID: ${id}`);
        
        const reservation = await ReservationRepository.findById(id);
        if (!reservation) {
            throw new Error('Reserva não encontrada.');
        }

        const cliente = await ClientRepository.findById(reservation.cliente_id); 
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        const updatedReservation = await ReservationRepository.complete(id);
        console.log("Reserva concluída com sucesso:", updatedReservation);

        const subject = 'Conclusão de Reserva';
        const text = `
            Conclusão de Reserva

            Sua reserva foi concluída com sucesso!

            Detalhes da Reserva:
            Número da Reserva: ${reservation.id}
            Número da Mesa: ${reservation.mesa_id}
            Data da Reserva: ${reservation.data_reserva}
            Hora da Reserva: ${reservation.hora_reserva}

            Agradecemos por escolher nosso serviço. Se precisar de ajuda, não hesite em nos contatar.
        `;

        await sendEmail(cliente.email, subject, text); 

        return updatedReservation;
    }
}

export default new ReservationService();
