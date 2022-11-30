const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.Home);
router.use("/user", require("./user"));

module.exports = router;
