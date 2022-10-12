import { Router } from 'express';
import authController from '../controllers/authController';
import UserController from '../controllers/userController';
const UserRouter = Router();

UserRouter.post('/', UserController.store);
UserRouter.post('/auth', authController.login);

export default UserRouter;