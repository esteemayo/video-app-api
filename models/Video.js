import slugify from 'slugify';
import mongoose, { Schema, Types } from 'mongoose';

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'A video must belong to a user'],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

videoSchema.index({ title: 1 })
videoSchema.index({ slug: -1 });

videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'video',
});

videoSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title, { lower: true });

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const videoWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (videoWithSlug.length) {
    this.slug = `${this.slug}-${videoWithSlug.length + 1}`;
  }
});

videoSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name username img subscribers',
  });

  next();
});

videoSchema.statics.getRandomVideos = async function () {
  return await this.aggregate([
    {
      $sample: { size: 40 },
    },
  ]);
};

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
