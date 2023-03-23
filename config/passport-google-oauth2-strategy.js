const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const crypto = require("crypto");
const User = require("../models/user_schema");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "247565575036-kjrkm1t58o41bao292i941dj34b5t6ds.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in passport-google", err);
          return done(err, null);
        }
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error creating user in passport-google-auth", err);
                return done(err, null);
              } else {
                return done(null, user);
              }
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
