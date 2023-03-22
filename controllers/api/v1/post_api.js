const Post = require("../../../models/post_schema");
const Comment = require("../../../models/comment_schema");

module.exports.Post = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  if (posts) {
    return res.status(200).json({
      data: posts,
    });
  } else {
    return res.status(400).json({ message: "post not found" });
  }
};

module.exports.Destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object into string

    if (!post || post.user != req.user.id) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    post.remove();

    await Comment.deleteMany({ post: req.params.id });
    return res.status(200).json({
      message: "Post and associated comments deleted succesfully",
    });
  } catch (err) {
    console.log(`Error while deleting post: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
