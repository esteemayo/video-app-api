/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as videoController from '../controllers/videoController.js';

const router = express.Router();

router.get('/trend', videoController.getVideos);

router.get(
  '/details/:slug',
  authMiddleware.verifyUser,
  videoController.getVideoBySlug,
);

router
  .route('/')
  .get(videoController.getVideos)
  .post(
    authMiddleware.protect,
    authMiddleware.verifyUser,
    videoController.createVideo,
  );

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(authMiddleware.verifyUser, videoController.getVideoById)
  .patch(authMiddleware.verifyUser, videoController.updateVideo)
  .delete(authMiddleware.verifyUser, videoController.deleteVideo);

export default router;
