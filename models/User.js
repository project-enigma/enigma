require('dotenv').config();

const mongoose = require('mongoose');
require('./Trip');
require('./Review');

const {
  Schema,
} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  imgName: {
    type: String,
    default: 'defaultProfile.png',
  },
  imgPath: {
    type: String,
    default: process.env.CLOUDINARY_DEFAULTPROFILE_IMG,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
