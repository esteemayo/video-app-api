/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as commentController from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware.protect);

router.get('/videos/:videoId', commentController.getCommentsOnVideo);

router
  .route('/')
  .get(commentController.getComments)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('user'),
    commentController.createComment,
  );

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

export default router;
