const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// User Model
const User = require("../models/user_schema");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);

          return done(err);
        } else {
          if (!user || user.password != password) {
            req.flash("error", "Invalid User / Password");
            return done(null, false);
          } else {
            return done(null, user);
          }
        }
      });
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log(`Error while finding the user --> passport: ${err}`);
      return done(err);
    } else {
      return done(null, user);
    }
  });
});

module.exports = passport;
