import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class TodoController {
    public async store(req: Request, res: Response) {
        try {
            const { title, userId } = req.body;

            const todo = await prisma.toDo.create({
                data: {
                    title,
                    userId
                },
            });
            return res.json(todo);
        } catch (error) {

        }
    }

    public async index(req: Request, res: Response) {
        try {
            const { userId } = req.body;

            const todos = await prisma.toDo.findMany({
                where: {
                    userId
                }
            })

            return res.json(todos);
        } catch (error) {
            console.log(error);
            return res.status(400).json({"error": "Erro ao listar todos!"});
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id, title } = req.body;

            const todo = await prisma.toDo.update({
                where: {
                    id
                },
                data: {
                    title
                }
            });

            return res.json(todo);
        } catch (error) {
            console.log(error);
            return res.status(400).json({"error": "Erro ao atualizar todo!"});
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.body;

            const todo = await prisma.toDo.delete({
                where: {
                    id
                }
            });

            return res.json(todo);
        } catch (error) {
            console.log(error);
            return res.status(400).json({"error": "Erro ao deletar todo!"});
        }
    }

    public async done(req: Request, res: Response) {
        try {
            const { id } = req.body;

            const todo = await prisma.toDo.update({
                where: {
                    id
                },
                data: {
                    completed: true 
                }
            });

            return res.json(todo);
        } catch (error) {
            console.log(error);
            return res.status(400).json({"error": "Erro ao atualizar todo!"});
        }
    }

    public async undone(req: Request, res: Response) {
        try {
            const { id } = req.body;

            const todo = await prisma.toDo.update({
                where: {
                    id
                },
                data: {
                    completed: false 
                }
            });

            return res.json(todo);
        } catch (error) {
            return res.status(400).json({"error": "Erro ao atualizar todo!"});
        }
    }

    public async check(req: Request, res: Response) {
        try {
             const { id } = req.body;
 
             let todo = await prisma.toDo.findFirst({
                 where: {
                     id
                 }
             })
 
             todo = await prisma.toDo.update({
                 where: {
                     id
                 },
                 data: {
                     completed: !todo?.completed
                 }
             })
 
             return res.json(todo)
        } catch (error) {
         console.log(error);
        }
     }
}
export default new TodoController();