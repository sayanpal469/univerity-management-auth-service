import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routes/router';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(GlobalErrorHandler);

app.get('/', async (req: Request, res: Response) => {
  res.send('University management system');
  // Promise.reject((new Error('Unhandeled promise rejection')))
  // throw new Error('Hello error')
});

export default app;
