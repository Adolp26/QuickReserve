import { Request, Response } from 'express';
import clientService from '../services/ClientService';
import emailService from '../services/EmailService';
import authService from '../services/AuthService'; // Importe o AuthService


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

             // Envia email de confirmação
            await emailService.sendEmail(
            email,
            'Cadastro realizado com sucesso',
            `Olá ${nome},\n\nSeu cadastro foi realizado com sucesso!\n\nObrigado!`
        );

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

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
    
        try {
          const { token, clientId } = await authService.loginClient(email, senha);
          return res.json({ token, clientId });
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Erro ao fazer login:', errorMessage);
            return res.status(401).json({ error: errorMessage });
          }
    }
}

export default new ClientController();
