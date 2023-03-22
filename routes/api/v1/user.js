const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserApi = require("../../../controllers/api/v1/user_api");

router.post("/create-session", UserApi.CreateSession);

module.exports = router;
