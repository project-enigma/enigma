require('dotenv').config();

const Trip = require('../../models/Trip');

const express = require('express');


const starRouter = express.Router();

starRouter.get('/getAll', (req, res, next) => {
  Trip.find()
    .then(trips => res.json({ trips }))
    .catch(err => next(err));
});

module.exports = starRouter;
