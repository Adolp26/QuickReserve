require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Testa a conexão com o banco de dados
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Não foi possível iniciar o servidor:', err.message);
    process.exit(1); // Encerra o processo com um código de erro
  }
};

// Inicia o servidor
startServer();
