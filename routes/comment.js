const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/local-auth-middleware");
const CommentController = require("../controllers/comment_controller");

router.post(
  "/create",
  authMiddleware.checkAuthentication,
  CommentController.Create
);

router.get(
  "/destroy/:id",
  authMiddleware.checkAuthentication,
  CommentController.Destroy
);

module.exports = router;
