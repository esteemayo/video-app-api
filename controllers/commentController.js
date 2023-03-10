/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import APIFeatures from '../utils/apiFeatures.js';
import ForbiddenError from '../errors/forbidden.js';
import NotFoundError from '../errors/notFound.js';

export const getComments = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.params.videoId) filter = { video: req.params.videoId };

  const features = new APIFeatures(Comment.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const comments = await features.query;

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    nbHits: comments.length,
    comments,
  });
});

export const getCommentsOnVideo = asyncHandler(async (req, res, next) => {
  const { videoId } = req.params;

  const comments = await Comment.find({ video: videoId });

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    nbHits: comments.length,
    comments,
  });
});

export const getComment = asyncHandler(async (req, res, next) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(
      new NotFoundError(`There is no comment with the given ID ↔ ${commentId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    comment,
  });
});

export const createComment = asyncHandler(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.video) req.body.video = req.params.videoId;

  const comment = await Comment.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    comment,
  });
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findById(commentId);
  const video = await Video.findById(comment.video);

  if (!comment) {
    return next(
      new NotFoundError(`There is no comment with the given ID ↔ ${commentId}`)
    );
  }

  if (
    req.user.id === String(comment.user._id) ||
    req.user.id === String(video.user._id) ||
    req.user.role === 'admin'
  ) {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { ...req.body } },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(StatusCodes.OK).json({
      status: 'success',
      comment: updatedComment,
    });
  }

  return next(new ForbiddenError('You can update only your comment'));
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findById(commentId);
  const video = await Video.findById(comment.video);

  if (!comment) {
    return next(
      new NotFoundError(`There is no comment with the given ID ↔ ${commentId}`)
    );
  }

  if (
    req.user.id === String(comment.user._id) ||
    req.user.id === String(video.user._id) ||
    req.user.role === 'admin'
  ) {
    await comment.remove();

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      comment: null,
    });
  }

  return next(new ForbiddenError('You can delete only your comment'));
});
