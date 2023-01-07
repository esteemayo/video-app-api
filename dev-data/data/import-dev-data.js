import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'colors';

import Video from '../../models/Video.js';
import User from '../../models/User.js';
import Comment from '../../models/Comment.js';
import connectDB from '../../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './variables.env' });

connectDB();

const videos = JSON.parse(fs.readFile(`${__dirname}/videos.json`, 'utf-8'));
const users = JSON.parse(fs.readFile(`${__dirname}/users.json`, 'utf-8'));
const comments = JSON.parse(fs.readFile(`${__dirname}/comments.json`, 'utf-8'));
