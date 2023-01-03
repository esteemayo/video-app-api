/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.patch('/update-me', userController.updateMe);

router.get('/me', userController.getMe, userController.getUser);

router.delete('/delete-me', userController.deleteMe);

router.patch('/subscribe/:id', userController.subscribe);

router.patch('/unsubscibe/:id', userController.unsubscribe);

router.patch('/like/:videoId', userController.likeVideo);

router.patch('/dislike/:videoId', userController.dislikeVideo);

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
