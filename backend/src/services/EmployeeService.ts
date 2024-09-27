import EmployeeRepository from '../repositories/EmployeeRepository';

class EmployeeService {
    async register(nome: string, email: string, senha: string) {
        return EmployeeRepository.create(nome, email, senha);
    }

    async getEmployeeById(id: number) {
        return EmployeeRepository.findById(id);
    }

    async getEmployeeByEmail(email: string) {
        return EmployeeRepository.findByEmail(email);
    }

    async updateEmployee(id: number, email?: string, password?: string) {
        return EmployeeRepository.update(id, email, password);
    }

    async deleteEmployee(id: number) {
        return EmployeeRepository.delete(id);
    }

    async login(email: string, senha: string) {
        const Employee = await EmployeeRepository.findByEmail(email);
        if (Employee && await EmployeeRepository.comparePassword(senha, Employee.senha)) {
            return Employee; // Employeee autenticado com sucesso
        }
        return null; // Retorna nulo se não autenticado
    }
}

export default new EmployeeService();
