/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import NotFoundError from '../errors/notFound.js';

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.find();

    res.status(StatusCodes.OK).json({
      status: 'success',
      requestedAt: req.requestTime,
      nbHits: docs.length,
      docs,
    });
  });

export const getOneById = (Model) =>
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
