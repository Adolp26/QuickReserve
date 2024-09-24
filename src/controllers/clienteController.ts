// src/controllers/clienteController.ts
import { Request, Response } from 'express';
import { Cliente } from '../models/clienteModel';

export const clienteController = {
    cadastrar: async (req: Request, res: Response) => {
        const { nome, email, senha } = req.body;

        try {
            const novoCliente = await Cliente.create({ nome, email, senha });
            res.status(201).json(novoCliente);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    listar: async (req: Request, res: Response) => {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },

    atualizar: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            const [resultado] = await Cliente.update(
                { nome, email, senha },
                { where: { id } }
            );

            if (resultado === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    deletar: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const resultado = await Cliente.destroy({ where: { id } });

            if (resultado === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
};
