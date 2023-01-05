/* eslint-disable */
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import BadRequestError from '../errors/badRequest.js';
import NotFoundError from '../errors/notFound.js';
import createSendToken from '../utils/createSendToken.js';

export const getUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.new;

  const users = query
    ? await User.find().sort('-createdAt').limit(5)
    : await User.find().sort('-_id');

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    nbHits: users.length,
    users,
  });
});

export const getUserStats = asyncHandler(async (req, res, next) => {
  const stats = await User.getUserStats();

  res.status(StatusCodes.OK).json({
    status: 'success',
    stats,
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

export const updateMe = asyncHandler(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  if (password || passwordConfirm) {
    return next(
      new BadRequestError(
        `This route is not for password updates. Please use update ${req.protocol
        }://${req.get('host')}/api/v1/auth/update-my-password`
      )
    );
  }

  const filterBody = _.pick(req.body, ['img', 'name', 'email', 'username']);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { ...filterBody } },
    {
      new: true,
      runValidators: true,
    }
  );

  createSendToken(updatedUser, StatusCodes.OK, req, res);
});

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

export const deleteMe = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;

  await User.findByIdAndUpdate(userId, { active: false });

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    user: null,
  });
});

export const subscribe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });

  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Subscription successfull',
  });
});

export const unsubscribe = asyncHandler(async (req, res, next) => {
  await User.findById(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });

  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Unsubscription successfull',
  });
});

export const likeVideo = asyncHandler(async (req, res, next) => { });

export const dislikeVideo = asyncHandler(async (req, res, next) => { });

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const createUser = (req, res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    message: `This route is not defined! Please use ${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/register`,
  });
};
