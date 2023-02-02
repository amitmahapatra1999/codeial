const Post = require("../models/post_schema");
const Comment = require("../models/comment_schema");
const { post } = require("../routes");

module.exports.Create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });
      post.comments.push(comment);
      post.save();
      req.flash("success", "Comment Added succesfully");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);

    return res, redirect("back");
  }
};

module.exports.Destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment && comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          if (err) {
            req.flash("error", `error updating comment array in post: ${err}`);

            return res.redirect("back");
          }
          req.flash("success", `Comment deleted succesfully`);

          return res.redirect("back");
        }
      );
    } else {
      req.flash("error", `error finding the comment: ${err}`);

      return res.redirect("back");
    }
  });
};
