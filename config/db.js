/* eslint-disable */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './variables.env' });

const devEnv = process.env.NODE_ENV !== 'production';
const { DATABASE, DATABASE_LOCAL, DATABASE_PASSWORD } = process.env;

const dbLocal = DATABASE_LOCAL;
const mongoURI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

const db = devEnv ? dbLocal : mongoURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`Connected to MongoDB ↔ ${conn.connection.port}`.gray.bold);
  } catch (error) {
    throw error;
  }
};

mongoose.set('strictQuery', false);

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected'.strikethrough);
});

export default connectDB;
