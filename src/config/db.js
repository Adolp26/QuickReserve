const { Pool } = require('pg');
require('dotenv').config(); // Carregar variáveis de ambiente

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
  } catch (err) {
    throw new Error('Database connection failed: ' + err.message);
  }
}

module.exports = { testConnection };
