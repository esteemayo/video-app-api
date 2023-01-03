/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import UnauthenticatedError from './../errors/unauthenticated.js';

export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  if (user) {
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      user,
    });
  }
});

export const signin = asyncHandler(async (req, res, next) => { });

export const forgotPassword = asyncHandler(async (req, res, next) => { });

export const resetPassword = asyncHandler(async (req, res, next) => { });

export const updatePassword = asyncHandler(async (req, res, next) => { });
