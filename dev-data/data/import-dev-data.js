import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'colors';

import Video from '../../models/Video.js';
import User from '../../models/User.js';
import Comment from '../../models/Comment.js';
import connectDB from '../../config/db.js';

dotenv.config({ path: './variables.env' });

connectDB();