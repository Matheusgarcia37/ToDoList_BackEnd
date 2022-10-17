import { Router } from 'express';
import todoController from '../controllers/todoController';
import authMiddleware from '../middleware/authMiddleware';

const TodoRouter = Router();

TodoRouter.post('/', authMiddleware, todoController.store);
TodoRouter.get('/', authMiddleware, todoController.index);
TodoRouter.put('/', authMiddleware, todoController.update);
TodoRouter.delete('/', authMiddleware, todoController.delete);
TodoRouter.put('/done', authMiddleware, todoController.done);
TodoRouter.put('/undone', authMiddleware, todoController.undone);
TodoRouter.put('/check', authMiddleware, todoController.check);

export default TodoRouter;