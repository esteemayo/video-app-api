import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

export default app;
