const mongoose = require('mongoose');

const { Schema }   = mongoose;
require('dotenv').config();

const ReviewSchema = new Schema({
  place: String,
  title: String,
  description: String,
  images: [
    {
      imgPath: String,
      imgName: String,
    },
  ],
  location: {
    lat: String,
    lng: String,
  },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
