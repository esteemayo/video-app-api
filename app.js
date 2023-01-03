/* eslint-disable */
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// requiring routes
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import videoRoute from './routes/videos.js';
import commentRoute from './routes/comments.js';

dotenv.config({ path: './variables.env' });

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

// api routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/videos', videoRoute);
app.use('/api/v1/comments', commentRoute);

export default app;
