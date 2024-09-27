import { Request, Response } from 'express';
import EmployeeService from '../services/EmployeeService';
import emailService from '../services/EmailService';
import authService from '../services/AuthService';


class EmployeeController {
    async register(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        console.log('Dados recebidos para registro:', req.body);

        try {
            // Verifica se o email já está cadastrado
            const existingEmployee = await EmployeeService.getEmployeeByEmail(email);
            if (existingEmployee) {
                return res.status(409).json({ error: 'Email já cadastrado' }); // Código de status 409: Conflito
            }
            // Se o email não existir, continua com o registro
            const employee = await EmployeeService.register(nome, email, senha);

             // Envia email de confirmação
            await emailService.sendEmail(
            email,
            'Cadastro realizado com sucesso',
            `Olá ${nome},\n\nSeu cadastro foi realizado com sucesso!\n\nObrigado!`
        );

            return res.status(201).json(employee);

        } catch (error) {
            console.error('Erro ao registrar cliente:', error);
            return res.status(500).json({ error: 'Erro ao registrar cliente' });
        }
    }

    async getEmployee(req: Request, res: Response) {
        const { id } = req.params;
        const client = await EmployeeService.getEmployeeById(Number(id));
        if (client) {
            return res.json(client);
        }
        return res.status(404).json({ error: 'Client not found' });
    }


    async updateEmployee(req: Request, res: Response) {
        const { id } = req.params;
        const { email, senha } = req.body;
        const updateEmployee = await EmployeeService.updateEmployee(Number(id), email, senha);
        if (updateEmployee) {
            return res.json(updateEmployee);
        }
        return res.status(404).json({ error: 'Client not found' });
    }

    async deleteEmployee(req: Request, res: Response) {
        const { id } = req.params;
        const success = await EmployeeService.deleteEmployee(Number(id));
        if (success) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Employee not found' });
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
    
        try {
          const { token, employeeId } = await authService.loginEmployee(email, senha);
          return res.json({ token, employeeId });
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error('Erro ao fazer login:', errorMessage);
            return res.status(401).json({ error: errorMessage });
          }
    }
}

export default new EmployeeController();
