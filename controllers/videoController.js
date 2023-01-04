/* eslint-disable */
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Video from '../models/Video.js';
import NotFoundError from '../errors/notFound.js';

export const getVideos = asyncHandler(async (req, res, next) => { });

export const getVideoById = asyncHandler(async (req, res, next) => { });

export const getVideoBySlug = asyncHandler(async (req, res, next) => { });

export const createVideo = asyncHandler(async (req, res, next) => { });

export const updateVideo = asyncHandler(async (req, res, next) => { });

export const deleteVideo = asyncHandler(async (req, res, next) => { });
