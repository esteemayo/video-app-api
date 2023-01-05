import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  video: {
    type: mongoose.Types.ObjectId,
    ref: 'Video',
    required: 'A comment must belong to a video',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: 'A comment must belong to a user',
  },
}, {
  timestamps: true,
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
