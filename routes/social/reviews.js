const User = require('../../models/User');
const Review = require('../../models/Review');
const Comment = require('../../models/Comment');

const uploadCloud = require('../../config/cloudinary.js');
const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const reviewsRouter = express.Router();

reviewsRouter.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .populate('comments')
    .populate({ path: 'comments', populate: { path: 'authorId' } })
    .then(myReview => res.render('social/review', { myReview }))
    .catch(err => next(err));
});

reviewsRouter.post('/newComment', (req, res, next) => {
  console.log(req.body.postId);
  const newComment = {
    content: req.body.commentText,
    authorId: req.user.id,
  };
  Comment.create(newComment)
    .then((myComment) => {
      Review.findByIdAndUpdate(req.body.postId, { $push: { comments: myComment } })
        .then(() => res.redirect('/social/profile'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = reviewsRouter;
