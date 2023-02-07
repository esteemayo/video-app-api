import mongoose, { Schema, Types } from 'mongoose';

const commentSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  video: {
    type: Types.ObjectId,
    ref: 'Video',
    required: 'A comment must belong to a video',
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: 'A comment must belong to a user',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username img',
  });

  next();
});

const Comment = mongoose.models.Comment ||
  mongoose.model('Comment', commentSchema);

export default Comment;
