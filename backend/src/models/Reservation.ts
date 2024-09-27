import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Reservation extends Model {
  public id!: number;
  public cliente_id!: number;
  public mesa_id!: number;
  public funcionario_id!: number; // Presumindo que você queira incluir este campo no futuro
  public restaurante_id!: number; // Nova coluna para referência ao restaurante
  public data_reserva!: Date;  // Coluna separada para a data
  public hora_reserva!: string; // Coluna separada para a hora
  public status!: string;
  public data_criacao!: Date;
  public hora_final?: string; // Campo opcional para armazenar a hora final
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes', // Nome da tabela de clientes
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    mesa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mesas', // Nome da tabela de mesas
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurantes', // Nome da tabela de restaurantes
        key: 'id',
      },
      onDelete: 'CASCADE', // Se o restaurante for excluído, as reservas também são excluídas
    },
    data_reserva: {
      type: DataTypes.DATEONLY, // Tipo para armazenar apenas a data
      allowNull: false,
    },
    hora_reserva: {
      type: DataTypes.TIME, // Tipo para armazenar apenas a hora
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    hora_final: {
      type: DataTypes.TIME, // Tipo para armazenar apenas a hora
      allowNull: true, // Deve ser true para permitir que ele seja nulo
    },
  },
  {
    sequelize,
    tableName: 'reservas',
    timestamps: false,
  }
);

export default Reservation;
