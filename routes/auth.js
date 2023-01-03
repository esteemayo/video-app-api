/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

export default router;
