/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import UnauthenticatedError from './../errors/unauthenticated.js';
import BadRequestError from './../errors/badRequest.js';
import NotFoundError from '../errors/notFound.js';
import createSendToken from '../utils/createSendToken.js';
import sendEmail from './../utils/email.js';

export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({ ...req.body });

  if (user) {
    createSendToken(user, StatusCodes.CREATED, req, res);
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

  createSendToken(user, StatusCodes.OK, req, res);
});

export const forgotPassword = asyncHandler(async (req, res, next) => { });

export const resetPassword = asyncHandler(async (req, res, next) => { });

export const updatePassword = asyncHandler(async (req, res, next) => { });
