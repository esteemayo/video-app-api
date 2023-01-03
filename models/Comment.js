import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
