/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

export const register = asyncHandler(async (req, res, next) => { });

export const login = asyncHandler(async (req, res, next) => { });

export const forgotPassword = asyncHandler(async (req, res, next) => { });

export const resetPassword = asyncHandler(async (req, res, next) => { });

export const updatePassword = asyncHandler(async (req, res, next) => { });
