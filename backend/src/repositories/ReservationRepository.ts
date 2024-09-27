// src/repositories/ReservationRepository.ts
import Reservation from '../models/Reservation'; // Ajuste o caminho conforme necessário

class ReservationRepository {
    async create(reservationData: any) {
        // Validação dos dados
        const { cliente_id, mesa_id, restaurante_id, data_reserva, hora_reserva } = reservationData;
        if (!cliente_id || !mesa_id || !restaurante_id || !data_reserva || !hora_reserva) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        // Cria a nova reserva
        const reservation = await Reservation.create(reservationData);
        return reservation;
    }

    async findReservationByMesaAndDate(mesaId: number, dataReserva: Date) {
        // Busca reservas existentes
        return await Reservation.findOne({
            where: {
                mesa_id: mesaId,
                data_reserva: dataReserva,
            }
        });
    }

    async findAllByClienteId(clienteId: number) {
        return await Reservation.findAll({
            where: {
                cliente_id: clienteId,
            },
        });
    }

    async findAll() {
        return await Reservation.findAll();
    }

    async findById(id: number) {
        return await Reservation.findByPk(id);
    }

    async update(id: number, reservationData: any) {
        // Atualiza a reserva
        await Reservation.update(reservationData, {
            where: { id },
        });
        return this.findById(id); // Retorna a reserva atualizada
    }

    async delete(id: number) {
        // Remove a reserva
        await Reservation.destroy({
            where: { id },
        });
    }

    async cancel(id: number) {
        return await Reservation.update(
            { status: 'Cancelada', hora_final: new Date() }, // Atualiza o status e adiciona a hora final
            { where: { id } }
        );
    }

    // Método para concluir uma reserva
    async complete(id: number) {
        return await Reservation.update(
            { status: 'Concluída', hora_final: new Date() }, // Atualiza o status e adiciona a hora final
            { where: { id } }
        );
    }
}

export default new ReservationRepository();
