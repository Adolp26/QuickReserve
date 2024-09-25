import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // ou 465 para SSL
            secure: false, // true para 465, false para outras portas
            auth: {
                user: process.env.GMAIL_USER, // Seu email
                pass: process.env.GMAIL_PASS,   // Sua senha ou senha de aplicativo
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: process.env.GMAIL_USER, // Seu email
            to,
            subject,
            text,
        };

        try {
            console.log('Usuário:', process.env.GMAIL_USER);
            console.log('Senha:', process.env.GMAIL_PASS); // Não recomendo logar senhas em produção

            await this.transporter.sendMail(mailOptions);
            console.log('Email enviado para: ' + to);
        } catch (error) {
            console.error('Erro ao enviar email:', error);
        }
    }
}

export default new EmailService();
