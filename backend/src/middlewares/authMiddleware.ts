import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

// Extende a interface Request para incluir a propriedade user
interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Acesso não autorizado. Token não encontrado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

      // Adiciona um console.log para ver o conteúdo do token decodificado
      console.log('JWT Decodificado:', decoded); 

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Acesso proibido. Permissões insuficientes.' });
      }

      req.user = { id: decoded.id, email: decoded.email, role: decoded.role }; // Adiciona o usuário ao objeto de request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
  };
};
