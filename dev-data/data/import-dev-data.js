import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import 'colors';

import Video from '../../models/Video.js';
import User from '../../models/User.js';

dotenv.config({ path: './variables.env' });