import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Employee extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public restaurante_id?: number; // Referência ao restaurante (opcional)
  public data_criacao!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'restaurantes', // Nome da tabela referenciada
        key: 'id',
      },
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'funcionarios',
    timestamps: false, 
  }
);
