const express = require("express");
router = express.Router();
home = require("../controller/home");

router.get("/", home.home);

module.exports = router;
