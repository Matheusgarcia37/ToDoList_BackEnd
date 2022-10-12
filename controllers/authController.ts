import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class AuthController {
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado!' });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ error: 'Senha incorreta!' });
            }
            const token = jwt.sign({ id: user.id, name: user.name }, 'secret', {
                expiresIn: 86400,
            });
            return res.json({ token });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Erro ao realizar login!' });
        }
    }
}

export default new AuthController();