/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import NotFoundError from '../errors/notFound.js';

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const videos = await Video.find();

    res.status(StatusCodes.OK).json({
      status: 'success',
      requestedAt: req.requestTime,
      nbHits: videos.length,
      videos,
    });
  });