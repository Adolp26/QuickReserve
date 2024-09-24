import express from 'express';
import clienteRoutes from './routes/clienteRoutes';

const app = express();

app.use(express.json()); // Middleware para parsing do JSON

// Rotas
app.use('/api/clientes', clienteRoutes);

export default app;