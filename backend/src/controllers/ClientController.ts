import { Request, Response } from 'express';
import clientService from '../services/ClientService';

class ClientController {
    async register(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        console.log('Dados recebidos para registro:', req.body);

        try {
            // Verifica se o email já está cadastrado
            const existingClient = await clientService.getClientByEmail(email);
            if (existingClient) {
                return res.status(409).json({ error: 'Email já cadastrado' }); // Código de status 409: Conflito
            }
            // Se o email não existir, continua com o registro
            const client = await clientService.register(nome, email, senha);
            return res.status(201).json(client);
        } catch (error) {
            console.error('Erro ao registrar cliente:', error);
            return res.status(500).json({ error: 'Erro ao registrar cliente' });
        }
    }

    async getClient(req: Request, res: Response) {
        const { id } = req.params;
        const client = await clientService.getClientById(Number(id));
        if (client) {
            return res.json(client);
        }
        return res.status(404).json({ error: 'Client not found' });
    }

    async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const { email, senha } = req.body;
        const updatedClient = await clientService.updateClient(Number(id), email, senha);
        if (updatedClient) {
            return res.json(updatedClient);
        }
        return res.status(404).json({ error: 'Client not found' });
    }

    async deleteClient(req: Request, res: Response) {
        const { id } = req.params;
        const success = await clientService.deleteClient(Number(id));
        if (success) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Client not found' });
    }
}

export default new ClientController();
