const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/local-auth-middleware");
const PostController = require("../controllers/post_controller");

router.post(
  "/create-post",
  authMiddleware.checkAuthentication,
  PostController.CreatePost
);

router.post(
  "/create-comment",
  authMiddleware.checkAuthentication,
  PostController.CreateComment
);

module.exports = router;
