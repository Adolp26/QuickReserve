import { Usuario } from './usuarioModel';

export class Administrador implements Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataCriacao: Date;

    constructor(id: number, nome: string, email: string, senha: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = new Date();
    }

    static cadastrar(nome: string, email: string, senha: string): Administrador {
        const id = Date.now(); // Gera um ID simples
        return new Administrador(id, nome, email, senha);
    }

    login(email: string, senha: string): boolean {
        return this.email === email && this.senha === senha;
    }

    logout(): void {
        // Lógica de logout
    }

    updateProfile(nome: string, email: string, senha: string): void {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}
