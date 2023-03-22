const express = require("express");
const passport = require("passport");
const router = express.Router();
const PostApi = require("../../../controllers/api/v1/post_api");

router.get("/", PostApi.Post);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PostApi.Destroy
);
module.exports = router;
