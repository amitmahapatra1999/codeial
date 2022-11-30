// User model
const User = require("../models/user_schema");

// render user login page
module.exports.Login = (req, res) => {
  return res.render("login", {
    title: "Codeial | Login",
  });
};
// render user signup page
module.exports.Signup = (req, res) => {
  return res.render("signup", {
    title: "Codeial | Signup",
  });
};
// render user profile page
module.exports.Profile = (req, res) => {
  // this code is for manual authentication
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (user) {
  //       return res.render("profile", {
  //         title: "Codeial | Profile",
  //         user: user,
  //       });
  //     }
  //   });
  // } else {
  //   return res.redirect("/user/login");
  // }
  return res.render("profile", {
    title: "Codeial | Profile",
  });
};

// create new user document in the database
module.exports.CreateUser = (req, res) => {
  const data = req.body;
  if (data.password != data.confirm_password) {
    console.log("Password do not match");
    return res.redirect("back");
  }
  User.findOne({ email: data.email }, function (err, user) {
    if (err) {
      console.log(`Error in finding user: ${err}`);
      return res.redirect("back");
    }
    if (!user) {
      User.create(data, function (err, user) {
        if (err) {
          console.log(`Error in signup user: ${err}`);
        }
        console.log("Signup Succesful");
        return res.redirect("/user/login");
      });
    } else {
      console.log("User already exist");
      return res.redirect("back");
    }
  });
};

// create a new authenticated session
// manual authentication
// module.exports.CreateSession = (req, res) => {
//   const data = req.body;
//   User.findOne({ email: data.email }, function (err, user) {
//     if (err) {
//       console.log(`Error in finding user: ${err}`);
//       return res.redirect("back");
//     }
//     // handle user is not found
//     if (!user) {
//       console.log("User does not exist");
//       return res.redirect("back");
//     }
//     // handle user is found
//     else {
//       // handle password do not match
//       if (data.password != user.password) {
//         console.log("Incorrect Password");
//         return res.redirect("back");
//       }
//       // handle password matches
//       else {
//         console.log("Login succesful");
//         res.cookie("user_id", user.id);
//         return res.redirect("/user/profile");
//       }
//     }
//   });
// };
//
// create a new authenticated session
// pasport local  authentication
module.exports.CreateSession = (req, res) => {
  return res.redirect("/");
};

module.exports.DestroySession = function (req, res, next) {
  res.clearCookie("codeial");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
