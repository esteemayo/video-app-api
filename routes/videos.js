/* eslint-disable */
import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as videoController from '../controllers/videoController.js';

const router = express.Router();

router.get('/trend', videoController.getTrendingVideos);

router.get('/random', videoController.getRandomVideos);

router.get(
  '/subscribe',
  authMiddleware.protect,
  videoController.subscribe,
);

router.patch('/view/:id', videoController.views);

router.get(
  '/details/:slug',
  authMiddleware.verifyUser,
  videoController.getVideoBySlug,
);

router
  .route('/')
  .get(videoController.getVideos)
  .post(authMiddleware.protect, videoController.createVideo);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(authMiddleware.verifyUser, videoController.getVideoById)
  .patch(authMiddleware.verifyUser, videoController.updateVideo)
  .delete(authMiddleware.verifyUser, videoController.deleteVideo);

export default router;
