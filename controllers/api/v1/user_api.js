const User = require("../../../models/user_schema");
const jwt = require("jsonwebtoken");

module.exports.CreateSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        message: "Invalid Username or Password",
      });
    }
    return res.status(200).json({
      message: "SignIn succesful",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: 100000 }),
      },
    });
  } catch (err) {
    console.log(`Error while login: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
