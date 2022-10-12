import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
class UserController {
    public async store(req: Request, res: Response) {
        console.log(req.body)     
        try {
            const { name, email, password } = req.body;
            const userExists = await prisma.user.findFirst({
                where: {
                    email
                }
            });

            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe!' });
            }

            const hashedPassword = await bcrypt.hash(password, 8);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            return res.json({ "message": "Usuário criado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Erro ao criar usuário!' });
        }
    }
}

export default new UserController();