/* eslint-disable */
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// requiring routes
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import videoRoute from './routes/videos.js';
import commentRoute from './routes/comments.js';
import NotFoundError from './errors/notFound.js';
import globalErrorHandler from './middlewares/errorHandler.js';

dotenv.config({ path: './variables.env' });

const app = express();

app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// api routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/videos', videoRoute);
app.use('/api/v1/comments', commentRoute);

app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

export default app;
