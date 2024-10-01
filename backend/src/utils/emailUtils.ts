import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

// Função para enviar email com destinatário, assunto e conteúdo como parâmetros
export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // ou 465 para SSL
        secure: false, // true para 465, false para outras portas
        auth: {
            user: process.env.GMAIL_USER, // Seu email
            pass: process.env.GMAIL_PASS,   // Sua senha ou senha de aplicativo
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER, // Seu email
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado para: ' + to);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        throw error; // Lançar erro para ser tratado onde a função for chamada
    }
}
