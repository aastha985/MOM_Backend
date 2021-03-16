const express = require("express");
router = express.Router();
user = require("../controller/user");
const pool = require("../database.js");

router.post("/signup", user.signup);
router.get("/login", user.login);
router.get("/profile", user.profile);
router.post("/createProfile", user.createProfile);
router.get("/isProfileCreated", user.IsProfileCreated);
router.post("/premium", user.premium);

module.exports = router;
