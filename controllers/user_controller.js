// User model
const User = require("../models/user_schema");
const path = require("path");
const fs = require("fs");

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

  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "Codeial | Profile",
      profile_user: user,
    });
  });
};

// create new user document in the database
module.exports.CreateUser = async (req, res) => {
  const data = req.body;
  if (data.password != data.confirm_password) {
    req.flash("error", "Password do not match");
    return res.redirect("back");
  }
  try {
    let user = await User.findOne({ email: data.email });

    if (!user) {
      await User.create(data);
      req.flash("success", "Signup Succesful");

      return res.redirect("/user/login");
    } else {
      req.flash("error", "User already exist");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.Update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadAvatar(req, res, function (err) {
        if (err) {
          console.log("Multer Error:", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "Profile Updated Succesfully");
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("Unauthorized Access");
  }
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
module.exports.CreateSession = function (req, res) {
  console.log("log at create session");
  // console.log("request", req);
  console.log("response", res);
  // req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.DestroySession = function (req, res, next) {
  res.clearCookie("codeial");

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");
    res.redirect("/");
  });
};
