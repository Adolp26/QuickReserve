import express from 'express';
import clientRoutes from './routes/clientRoutes';
import employeeRoutes from './routes/employeeRoutes'


const app = express();

app.use(express.json()); // Para suportar JSON no body

// Use as rotas com prefixo "/api"
app.use('/api', clientRoutes); // Rotas de cliente
app.use('/api', employeeRoutes); // Rotas do funcionário

export default app;