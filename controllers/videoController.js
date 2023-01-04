/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Video from '../models/Video.js';
import NotFoundError from '../errors/notFound.js';
import ForbiddenError from '../errors/forbidden.js';

export const getVideos = asyncHandler(async (req, res, next) => { });

export const getVideoById = asyncHandler(async (req, res, next) => { });

export const getVideoBySlug = asyncHandler(async (req, res, next) => { });

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

  return next(new ForbiddenError('You are not authorized to perform this operation'));
});

export const deleteVideo = asyncHandler(async (req, res, next) => { });
