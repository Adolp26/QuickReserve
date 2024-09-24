// src/models/funcionarioModel.ts
import { Usuario } from './usuarioModel';

export class Funcionario implements Usuario {
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

    static cadastrar(nome: string, email: string, senha: string): Funcionario {
        const id = Date.now(); // Gera um ID simples, você pode substituir pela lógica de ID do banco de dados
        return new Funcionario(id, nome, email, senha);
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
