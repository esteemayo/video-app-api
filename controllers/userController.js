/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

export const getUsers = asyncHandler(async (req, res, next) => { });

export const getUser = asyncHandler(async (req, res, next) => { });

export const updateUser = asyncHandler(async (req, res, next) => { });

export const updateMe = asyncHandler(async (req, res, next) => { });

export const deleteUser = asyncHandler(async (req, res, next) => { });

export const deleteMe = asyncHandler(async (req, res, next) => { });

export const subscribe = asyncHandler(async (req, res, next) => { });

export const unsubscribe = asyncHandler(async (req, res, next) => { });

export const likeVideo = asyncHandler(async (req, res, next) => { });

export const dislikeVideo = asyncHandler(async (req, res, next) => { });

export const getMe = (req, res) => { };

export const createUser = (req, res) => { };