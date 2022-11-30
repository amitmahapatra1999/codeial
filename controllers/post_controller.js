const Post = require("../models/post_schema");

module.exports.CreatePost = function (req, res) {
  if (req.body.content) {
    Post.create(
      {
        title: req.body.title,
        content: req.body.content,
        user: req.user._id,
      },
      function (err, data) {
        if (err) {
          console.log(`Error while creating the post:${err}`);
          return res.redirect("back");
        } else {
          console.log(`Post create succesfully:${data}`);
          return res.redirect("back");
        }
      }
    );
  } else {
    return res.redirect("back");
  }
};
