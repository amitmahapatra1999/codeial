const express = require("express");

const router = express.Router();
const UserController = require("../controllers/user_controller");
const passport = require("passport");
const authMiddleware = require("../config/local-auth-middleware");

// User Routes
router.get("/login", UserController.Login);
router.get("/signup", UserController.Signup);
router.get(
  "/profile/:id",
  authMiddleware.checkAuthentication,
  UserController.Profile
);

router.post("/create", UserController.CreateUser);
router.post(
  "/update/:id",
  authMiddleware.checkAuthentication,
  UserController.Update
);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/login" }),
  UserController.CreateSession
);

router.get("/signout", UserController.DestroySession);

module.exports = router;
