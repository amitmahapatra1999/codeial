const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/local-auth-middleware");
const PostController = require("../controllers/post_controller");

router.post(
  "/create",
  authMiddleware.checkAuthentication,
  PostController.Create
);

router.get(
  "/destroy/:id",
  authMiddleware.checkAuthentication,
  PostController.Destroy
);

module.exports = router;
