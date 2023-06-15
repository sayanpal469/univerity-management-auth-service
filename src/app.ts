import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routes/router';
import httpStatusCode from 'http-status-codes';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// Global error handler
app.use(GlobalErrorHandler);

// API error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

app.get('/', async (req: Request, res: Response) => {
  res.send('University management system');
  // Promise.reject((new Error('Unhandeled promise rejection')))
  // throw new Error('Hello error')
});

export default app;
