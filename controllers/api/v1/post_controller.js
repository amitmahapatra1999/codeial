const Post = require("../../../models/post_schema");

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
    return res.json(200, {
      data: posts,
    });
  } else {
    return res.status(400).json({ message: "post not found" });
  }
};
