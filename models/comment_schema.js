const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //   comment belongs to post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    // comment belongs to user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
