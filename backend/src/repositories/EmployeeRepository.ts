import { Employee } from '../models/Employee';
import bcrypt from 'bcrypt';

class EmployeeRepository {
    async create(nome: string, email: string, senha: string) {
        const hashedsenha = await bcrypt.hash(senha, 10);
        return Employee.create({ nome, email, senha: hashedsenha });
    }

    async findById(id: number) {
        return Employee.findByPk(id);
    }

    async findByEmail(email: string) {
        return Employee.findOne({ where: { email } });
    }

    async update(id: number, email?: string, senha?: string) {
        const Employee = await this.findById(id);
        if (Employee) {
            if (email) Employee.email = email;
            if (senha) Employee.senha = await bcrypt.hash(senha, 10);
            await Employee.save();
            return Employee;
        }
        return null;
    }

    async delete(id: number) {
        const Employee = await this.findById(id);
        if (Employee) {
            await Employee.destroy();
            return true;
        }
        return false;
    }

    async comparePassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default new EmployeeRepository();
