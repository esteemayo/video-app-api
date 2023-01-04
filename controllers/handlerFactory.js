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

export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id: docId } = req.params;

    const video = await Model.findById(docId);

    if (!video) {
      return next(
        new NotFoundError(`There is no video with the given ID ↔ ${docId}`)
      );
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      video,
    });
  });
