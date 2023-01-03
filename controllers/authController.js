/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import UnauthenticatedError from './../errors/unauthenticated.js';
import BadRequestError from './../errors/badRequest.js';

export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  if (user) {
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      user,
    });
  }
});

export const signin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new BadRequestError('Please enter your username and password'));
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return next(new UnauthenticatedError('Incorrect username or password'));
  }

  const token = user.generateToken();

  res.status(StatusCodes.OK).json({
    status: 'success',
    token,
    user,
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => { });

export const resetPassword = asyncHandler(async (req, res, next) => { });

export const updatePassword = asyncHandler(async (req, res, next) => { });
