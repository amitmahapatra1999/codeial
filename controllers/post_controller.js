const Post = require("../models/post_schema");
const Comment = require("../models/comment_schema");

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

module.exports.CreateComment = function (req, res) {
  // console.log(req.body);
  // return res.redirect("back");
  if (req.body.content) {
    Comment.create(
      {
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      },
      function (err, data) {
        if (err) {
          console.log(`Error while adding comment to db: ${err}`);
          return res.redirect("back");
        }
        console.log("Comment Added succesfully");
        return res.redirect("back");
      }
    );
  }
};
