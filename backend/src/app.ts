import express from 'express';
import clientRoutes from './routes/clientRoutes';

const app = express();

app.use(express.json()); // Para suportar JSON no body

// Use as rotas
app.use('/api', clientRoutes); // Isso adiciona o prefixo '/api' às rotas de cliente

export default app;