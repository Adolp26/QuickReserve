import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || 'defaultSecret';
// export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';
