/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.patch('/update-me', authMiddleware.protect, userController.updateMe);

router.get('/me', authMiddleware.protect, userController.getMe, userController.getUser);

router.delete(
  '/delete-me',
  authMiddleware.protect,
  userController.deleteMe,
);

router.patch(
  '/subscribe/:id',
  authMiddleware.protect,
  userController.subscribe,
);

router.patch(
  '/unsubscribe/:id',
  authMiddleware.protect,
  userController.unsubscribe,
);

router.patch(
  '/like/:videoId',
  authMiddleware.protect,
  userController.likeVideo,
);

router.patch(
  '/dislike/:videoId',
  authMiddleware.protect,
  userController.dislikeVideo,
);

router.get('/stats',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  userController.getUserStats,
);

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.getUsers,
  )
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.updateUser,
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.deleteUser,
  );

export default router;
