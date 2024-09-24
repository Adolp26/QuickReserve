export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataCriacao: Date;

    login(email: string, senha: string): boolean;
    logout(): void;
    updateProfile(nome: string, email: string, senha: string): void;

}