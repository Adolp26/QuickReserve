import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Cliente extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
}

Cliente.init(
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
  },
  {
    sequelize,
    tableName: 'clientes',
    timestamps: false,
  }
);

export { Cliente };
