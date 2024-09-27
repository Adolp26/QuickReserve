import clientRepository from '../repositories/ClientRepository';

class ClientService {
    async register(nome: string, email: string, senha: string) {
        return clientRepository.create(nome, email, senha);
    }

    async getClientById(id: number) {
        return clientRepository.findById(id);
    }

    async getClientByEmail(email: string) {
        return clientRepository.findByEmail(email);
    }

    async updateClient(id: number, email?: string, password?: string) {
        return clientRepository.update(id, email, password);
    }

    async deleteClient(id: number) {
        return clientRepository.delete(id);
    }

    async login(email: string, senha: string) {
        const client = await clientRepository.findByEmail(email);
        if (client && await clientRepository.comparePassword(senha, client.senha)) {
            return client; // Cliente autenticado com sucesso
        }
        return null; // Retorna nulo se não autenticado
    }
}

export default new ClientService();
