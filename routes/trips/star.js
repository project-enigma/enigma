require('dotenv').config();

const User = require('../../models/User');

const Trip = require('../../models/Trip');

const express = require('express');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const starRouter = express.Router();

starRouter.get('/getAll', (req, res, next) => {
  Trip.find()
    .then(trips => res.json({ trips }))
    .catch(err => next(err));
});

module.exports = starRouter;
