const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
require('dotenv').config();
require('./Comment');

const ReviewSchema = new Schema({
  place: String,
  title: String,
  description: String,
  images: [{
    imgPath: String,
    imgName: String,
  }],
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  location: {
    lat: String,
    lng: String,
  },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
