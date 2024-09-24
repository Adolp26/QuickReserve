import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const config: DBConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 5432,
};

const pool = new Pool(config);

// Função para testar a conexão
export const testConnection = async (): Promise<void> => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

// Exporta o pool para ser usado em outros lugares
export default pool;
