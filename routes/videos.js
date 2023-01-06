/* eslint-disable */
import express from 'express';

import commentRouter from './comments.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as videoController from '../controllers/videoController.js';

const router = express.Router();

router.use('/:videoId/comments', commentRouter);

router.get('/trend', videoController.getTrendingVideos);

router.get('/random', videoController.getRandomVideos);

router.get(
  '/subscribe',
  authMiddleware.protect,
  videoController.subscribe,
);

router.get('/tags', videoController.getVideosByTag);

router.get('/search', videoController.searchVideo);

router.patch('/view/:id', videoController.views);

router.get(
  '/details/:slug',
  videoController.getVideoBySlug,
);

router
  .route('/')
  .get(videoController.getVideos)
  .post(authMiddleware.protect, videoController.createVideo);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(videoController.getVideoById)
  .patch(videoController.updateVideo)
  .delete(videoController.deleteVideo);

export default router;
