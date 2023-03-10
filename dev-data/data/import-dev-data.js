/* eslint-disable */
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

const videos = JSON.parse(fs.readFileSync(`${__dirname}/videos.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${__dirname}/comments.json`, 'utf-8'));

const importData = async () => {
  try {
    await Video.insertMany(videos);
    await User.insertMany(users);
    await Comment.insertMany(comments);
    console.log(
      'šššššššš Data successfully loaded! šššššššš'.green.bold
    );
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    console.log('š¢š¢ Goodbye Data...');
    await Video.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
    console.log(
      'Data successfully deleted! To load sample data, run\n\n\t npm run sample\n\n'
        .blue.bold
    );
    process.exit();
  } catch (err) {
    console.log(
      '\nšššššššš Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
        .red.bold
    );
    console.log(err);
    process.exit();
  }
};

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  importData();
}
