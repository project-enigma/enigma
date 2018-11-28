require('dotenv').config();

const User = require('../../models/User');

const Trip = require('../../models/Trip');

const express = require('express');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const tripsRouter = express.Router();


tripsRouter.get('/', (req, res, next) => {
  Trip.find()
    .then(trips => res.render('trips', { trips }))
    .catch(err => next(err));
});

tripsRouter.get('/buy/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => res.render('trips/buy', { trip }))
    .catch(err => next(err));
});


tripsRouter.get('/buy/:id/success', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => res.render('trips/success', { trip }))
    .catch(err => next(err));
});

tripsRouter.post('/buy/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, { $addToSet: { users: req.user.id } })
    .then(() => {
      User.findByIdAndUpdate(req.user.id, { $addToSet: { trips: req.params.id } })
        .then(() => res.redirect(`/trips/buy/${req.params.id}/success`))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = tripsRouter;
