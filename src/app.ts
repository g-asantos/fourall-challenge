import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { router } from './routes';
import { errors } from 'celebrate';
import AppError from './shared/errors/AppError'


import './shared/infra/typeorm';

import './shared/container';

const app = express();

app.use(express.json());
app.use(router);


app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export {app};
