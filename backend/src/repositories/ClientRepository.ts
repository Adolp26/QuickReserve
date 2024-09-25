import { Client } from '../models/Client';
import bcrypt from 'bcrypt';

class ClientRepository {
    async create(nome: string, email: string, senha: string) {
        const hashedsenha = await bcrypt.hash(senha, 10);
        return Client.create({ nome, email, senha: hashedsenha });
    }

    async findById(id: number) {
        return Client.findByPk(id);
    }

    async findByEmail(email: string) {
        return Client.findOne({ where: { email } });
    }

    async update(id: number, email?: string, senha?: string) {
        const client = await this.findById(id);
        if (client) {
            if (email) client.email = email;
            if (senha) client.senha = await bcrypt.hash(senha, 10);
            await client.save();
            return client;
        }
        return null;
    }

    async delete(id: number) {
        const client = await this.findById(id);
        if (client) {
            await client.destroy();
            return true;
        }
        return false;
    }
}

export default new ClientRepository();
