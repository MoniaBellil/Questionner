const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require("../models/User");;

require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: 'http://localhost:3000/users/auth/google/callback',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
  )
);
