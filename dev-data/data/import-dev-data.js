import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import 'colors';

import Video from '../../models/Video.js';

dotenv.config({ path: './variables.env' });