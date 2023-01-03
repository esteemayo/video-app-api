/* eslint-disable */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import UnauthenticatedError from '../errors/unauthenticated.js';
import ForbiddenError from './../errors/forbidden.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(
      new UnauthenticatedError(
        'You are not logged in! Please log in to get access'
      )
    );
  }

  const decoded = await promisify(jwt.verify)(process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select('-password');
  if (!currentUser) {
    return next(
      new UnauthenticatedError(
        'The user belonging to this token does no longer exist'
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new UnauthenticatedError(
        'User recently changed password! Please log in again'
      )
    );
  }

  req.user = currentUser;
  next();
});

export const restrictTo =
  (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ForbiddenError('You do not have permission to perform this action')
        );
      }
      next();
    };

export const verifyUser = (req, res, next) => {
  if (req.params.id === req.user.id || req.user.role === 'admin') {
    return next()
  }
  return next(new ForbiddenError('You are not authorized'));
};
