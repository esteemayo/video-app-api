/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Comment from './../models/Comment.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getComments = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Comment.find(), req.query)
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

export const getComment = asyncHandler(async (req, res, next) => { });

export const createComment = asyncHandler(async (req, res, next) => { });

export const updateComment = asyncHandler(async (req, res, next) => { });

export const deleteComment = asyncHandler(async (req, res, next) => { });
