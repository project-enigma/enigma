const mongoose = require('mongoose');

const { Schema }   = mongoose;
require('dotenv').config();

const TripSchema = new Schema({
  name: { type: String },
  from: { type: String },
  to: { type: String },
  tips: { type: String },
  price: { type: Number },
  depart: { type: Date },
  return: { type: Date },
  tickets: { type: Number, default: 30 },
  users: [{ type: Schema.Types.ObjectId }],
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
