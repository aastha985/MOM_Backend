const express = require("express");
router = express.Router();
home = require("../controller/hello");

router.get("/", home.home);

module.exports = router;
