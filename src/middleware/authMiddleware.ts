import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
    id: number;
    email: string;
    iat: number; // Timestamp de quando o token foi emitido
    exp: number; // Timestamp de quando o token expira
}

// Extensão da interface Request do Express
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload; // Adiciona a propriedade user
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        req.user = decoded; // Adiciona os dados do token ao objeto req para uso posterior
        next(); // Continua para a próxima função no middleware
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};
