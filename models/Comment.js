const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
require('./User');

const CommentSchema = Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
