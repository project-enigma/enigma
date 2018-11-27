require('dotenv').config();
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
((accessToken, refreshToken, profile, done) => {
  User.create({
    googleId: profile.id,
    email: 'p@p.com',
    username: profile.name.familyName,
    password: '12345',
    imgPath: profile.photos[0].value,
  }, (err, user) => done(err, user));
})));
