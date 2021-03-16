const express = require("express");
router = express.Router();
user = require("../controller/user");
const pool = require("../database.js");

router.post("/signup", user.signup);
router.get("/login", user.login);

module.exports = router;
