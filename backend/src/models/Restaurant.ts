import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Restaurant extends Model {
  public id!: number;
  public nome!: string;
  public endereco!: string;
  public hora_abertura!: Date;
  public hora_fechamento!: Date;
  public politicas_reserva!: string;
}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hora_abertura: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fechamento: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  politicas_reserva: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  tableName: 'restaurantes',
});

export default Restaurant;
