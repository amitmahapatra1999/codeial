const express = require("express");
const router = express.Router();
const PostController = require("../../../controllers/api/v1/post_controller");

router.get("/posts", PostController.Post);
module.exports = router;
