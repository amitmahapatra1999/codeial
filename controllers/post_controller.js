const Post = require("../models/post_schema");
const Comment = require("../models/comment_schema");

module.exports.Create = async function (req, res) {
  if (req.body.content) {
    try {
      await Post.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user._id,
      });
      req.flash("success", "Post create succesfully");

      return res.redirect("back");
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    return res.redirect("back");
  }
};

module.exports.Destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object into string
    if (post && post.user == req.user.id) {
      post.remove();
      console.log("Post deleted succesfully");
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Comments deleted succesfully");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
  }
};
