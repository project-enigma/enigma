const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
require('dotenv').config();

require('./User');

const TripSchema = new Schema({
  name: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  tips: {
    type: String,
  },
  price: {
    type: Number,
  },
  depart: {
    type: Date,
  },
  return: {
    type: Date,
  },
  tickets: {
    type: Number,
    default: 30,
  },
  stars: {
    type: Number,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
