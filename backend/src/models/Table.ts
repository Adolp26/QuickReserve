import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Table extends Model {
  public id!: number;
  public restaurante_id!: number; // Referência ao restaurante
  public numero!: number;
  public capacidade!: number;
  public disponivel!: boolean;
  public data_criacao!: Date;
}

Table.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurantes', // Nome da tabela referenciada
        key: 'id',
      },
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'mesas',
    timestamps: false,
  }
);

export default Table;
