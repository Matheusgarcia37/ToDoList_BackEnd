import express from 'express';
import UserRouter from './routes/user.routes';
import TodoRouter from './routes/todo.routes';
const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.use('/users', UserRouter);
app.use('/todos', TodoRouter);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});