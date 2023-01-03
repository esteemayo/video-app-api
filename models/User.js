import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter your username'],
    match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please enter your email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [8, 'Password must not be less than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    minlength: [8, 'Password must not be less than 8 characters'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [String],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
