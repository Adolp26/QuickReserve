// src/controllers/clientController.ts
import { Request, Response } from 'express';
import { Cliente } from '../models/clienteModel'; // Supondo que você tenha um modelo Cliente
import bcrypt from 'bcrypt'; // Importa o bcrypt

// Criar um novo cliente
export const createClient = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    try {

        // Verifica se o email já existe
        const existingClient = await Cliente.findOne({ where: { email } });
        if (existingClient) {
            return res.status(400).json({ message: 'Este e-mail já está em uso.' });
        }

        // Criptografia da senha
        const hashedPassword = await bcrypt.hash(senha, 10); // Criptografa a senha
        const newClient = await Cliente.create({ nome, email, senha: hashedPassword });
        return res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro desconhecido' });
    }
};

// Listar todos os clientes
export const listClients = async (req: Request, res: Response) => {
    try {
        const clients = await Cliente.findAll();
        return res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao listar clientes' });
    }
};

// Buscar um cliente por ID
export const getClientById = async (req: Request, res: Response) => {
    const clientId = req.params.id;

    try {
        const client = await Cliente.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        return res.status(200).json(client);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar cliente' });
    }
};

// Atualizar um cliente
export const updateClient = async (req: Request, res: Response) => {
    const clientId = req.params.id;
    const { nome, email, senha } = req.body;

    try {
        // Verifica se a senha foi alterada e, se sim, criptografa
        let updatedData: any = { nome, email };
        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, 10);
            updatedData.senha = hashedPassword;
        }

        const [updated] = await Cliente.update(updatedData, { where: { id: clientId } });
        if (updated) {
            const updatedClient = await Cliente.findByPk(clientId);
            return res.status(200).json(updatedClient);
        }
        return res.status(404).json({ message: 'Cliente não encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
};

// Remover um cliente
export const deleteClient = async (req: Request, res: Response) => {
    const clientId = req.params.id;

    try {
        const deleted = await Cliente.destroy({ where: { id: clientId } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        return res.status(404).json({ message: 'Cliente não encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao remover cliente' });
    }
};
