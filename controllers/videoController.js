/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Video from '../models/Video.js';
import ForbiddenError from '../errors/forbidden.js';
import NotFoundError from '../errors/notFound.js';

export const getVideos = asyncHandler(async (req, res, next) => {
  const videos = await Video.find();

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    nbHits: videos.length,
    videos,
  });
});

export const getVideoById = asyncHandler(async (req, res, next) => {
  const { id: videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(
      new NotFoundError(`There is no video with the given ID ↔ ${videoId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    video,
  });
});

export const getVideoBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const video = await Video.findOne({ slug });

  if (!video) {
    return next(
      new NotFoundError(`There is no video with the given SLUG ↔ ${slug}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    video,
  });
});

export const createVideo = asyncHandler(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const video = await Video.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    video,
  });
});

export const updateVideo = asyncHandler(async (req, res, next) => {
  const { id: videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(
      new NotFoundError(`There is no video with the given ID ↔ ${videoId}`)
    );
  }

  if (req.user.id === video.user || req.user.role === 'admin') {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: { ...req.body } },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(StatusCodes.OK).json({
      status: 'success',
      video: updatedVideo,
    });
  }

  return next(new ForbiddenError('You can update only your video'));
});

export const deleteVideo = asyncHandler(async (req, res, next) => {
  const { id: videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(
      new NotFoundError(`There is no video with the given ID ↔ ${videoId}`)
    );
  }

  if (req.user.id === video.user || req.user.role === 'admin') {
    await video.remove();

    return res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      video: null,
    });
  }

  return next(new ForbiddenError('You can update only your video'));
});
