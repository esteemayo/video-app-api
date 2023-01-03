/* eslint-disable */
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import NotFoundError from '../errors/notFound.js';
import BadRequestError from '../errors/badRequest.js';
import createSendToken from '../utils/createSendToken.js';

export const getUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.new;

  const users = query
    ? await User.find().sort('-createdAt').limit(5)
    : await User.find().sort('-_id');

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    users,
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return next(
      new NotFoundError(`There is no user with the given ID ↔ ${userId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return next(
      new NotFoundError(`There is no user with the given ID ↔ ${userId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: updatedUser,
  });
});

export const updateMe = asyncHandler(async (req, res, next) => { });

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return next(
      new NotFoundError(`There is no user with the given ID ↔ ${userId}`)
    );
  }

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    user: null,
  });
});

export const deleteMe = asyncHandler(async (req, res, next) => { });

export const subscribe = asyncHandler(async (req, res, next) => { });

export const unsubscribe = asyncHandler(async (req, res, next) => { });

export const likeVideo = asyncHandler(async (req, res, next) => { });

export const dislikeVideo = asyncHandler(async (req, res, next) => { });

export const getMe = (req, res) => { };

export const createUser = (req, res) => { };