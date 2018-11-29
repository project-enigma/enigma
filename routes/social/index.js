// routes/index.js
require('dotenv').config();
const User = require('../../models/User');
const Trip = require('../../models/Trip');
const uploadCloud = require('../../config/cloudinary.js');
const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const socialRouter = express.Router();


socialRouter.get('/profile', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const myEnv = process.env;
  User.findById(req.user)
    .populate('trips')
    .then(myUser => res.render('social/profile', { myUser, myEnv }))
    .catch(err => next(err));
});

socialRouter.get('/getTrips', (req, res, next) => {
  User.findById(req.user)
    .populate('reviews')
    .then(myUser => res.json({ myUser }))
    .catch(err => next(err));
});

socialRouter.get('/settings', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('social/settings');
});

socialRouter.post('/settings', [ensureLoggedIn('/auth/login'), uploadCloud.single('photo')], (req, res, next) => {
  const userId = req.body.userid;
  const myUser = {};

  if (req.body.email) {
    myUser.email = req.body.email;
  }

  if (req.body.username) {
    myUser.username = req.body.username;
  }

  if (req.body.password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    myUser.password = hashPass;
  }

  if (req.file) {
    myUser.imgPath = req.file.url;
    myUser.imgName = req.file.originalname;
  }

  User.findByIdAndUpdate(userId,  myUser, { new:true })
    .then(() => res.redirect('/social/profile'))
    .catch(err => console.log(`${err} in profile/settings`));
});

socialRouter.get('/friends', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .populate('friends')
    .then((myUser) => {
      res.render('social/friends', { myUser, error: req.session.error });
      delete req.session.error;
    })
    .catch(err => next(err));
});

socialRouter.post('/friends', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userId = req.body.userid;
  const { friendUsername } = req.body;
  if (friendUsername === '') {
    req.session.error = 'Here you should write your friend\'s username';
    res.redirect('/social/friends');
  }
  User.findOne({ username: friendUsername })
    .then((friend) => {
      User.findByIdAndUpdate(userId, { $addToSet: { friends: friend.id } })
        .populate('friends')
        .then(() => res.redirect('/social/friends'))
        .catch(err => next(err));
    })
    .catch(() => {
      req.session.error = 'The username doesn\'t exists';
      res.redirect('/social/friends');
    });
});

socialRouter.get('/chat/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userName = req.user.username;
  const userAll = req.user;
  Trip.findById(req.params.id)
    .populate('users')
    .then((myTrip) => {
      res.render('social/chat', {
        username:userName, myTrip, userAll, CHATENGINE_PUBLISH_KEY:process.env.CHATENGINE_PUBLISH_KEY, CHATENGINE_SUB_KEY : process.env.CHATENGINE_SUB_KEY,
      });
    });
});

socialRouter.post('/deleteFriend', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userId = req.user.id;
  const { friendName, friendId } = req.body;
  User.findByIdAndUpdate(userId, { $pull: { friends: friendId } })
    .then(() => res.redirect('/social/friends'))
    .catch(err => next(err));
});


module.exports = socialRouter;
