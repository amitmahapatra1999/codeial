// check if the user is authenticated
module.exports.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/user/login");
  }
};

module.exports.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
