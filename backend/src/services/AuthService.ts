import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import AdminRepository from '../repositories/AdminRepository';
import ClientRepository from '../repositories/ClientRepository';
// import EmployeeRepository from '../repositories/EmployeeRepository';
import { JWT_SECRET } from '../config/constants';

class AuthService {
    generateToken(id: number, email: string, role: string) {
        return jwt.sign({ id, email, role }, JWT_SECRET);
      }
//   // Login para administradores
//   async loginAdmin(email: string, password: string) {
//     const admin = await AdminRepository.findByEmail(email);

//     if (!admin) {
//       throw new Error('Administrador não encontrado');
//     }

//     const isPasswordValid = await bcrypt.compare(password, admin.senha);

//     if (!isPasswordValid) {
//       throw new Error('Senha inválida');
//     }

//     // Definindo o papel como 'admin'
//     const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
//     return { token, adminId: admin.id };
//   }

  // Login para clientes
  async loginClient(email: string, password: string) {
    const client = await ClientRepository.findByEmail(email);

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, client.senha);

    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Gerar o token após a validação do cliente
    const token = this.generateToken(client.id, client.email, 'client');
    return { token, clientId: client.id };
  }
}

//   // Login para funcionários
//   async loginEmployee(email: string, password: string) {
//     const employee = await EmployeeRepository.findByEmail(email);

//     if (!employee) {
//       throw new Error('Funcionário não encontrado');
//     }

//     const isPasswordValid = await bcrypt.compare(password, employee.senha);

//     if (!isPasswordValid) {
//       throw new Error('Senha inválida');
//     }

//     // Definindo o papel como 'employee'
//     const token = jwt.sign({ id: employee.id, email: employee.email, role: 'employee' }, JWT_SECRET, { expiresIn: '1h' });
//     return { token, employeeId: employee.id };
//   }


export default new AuthService();
