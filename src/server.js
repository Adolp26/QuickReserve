require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const { testConnection } = require('./config/db'); // Ajuste o caminho conforme necessário

const app = express();
const PORT = process.env.PORT || 3000; // Defina uma porta, padrão é 3000

const startServer = async () => {
  try {
    // Testa a conexão com o banco de dados
    await testConnection();
    
    // Se a conexão for bem-sucedida, inicie o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    // Se houver um erro de conexão, exiba o erro e encerre o processo
    console.error('Não foi possível iniciar o servidor:', err.message);
    process.exit(1); // Encerra o processo com um código de erro
  }
};

// Inicia o servidor
startServer();
