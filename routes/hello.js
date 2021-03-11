const express = require("express");
router = express.Router();
hello = require("../controller/hello");
const pool = require("../database.js");

router.get("/", hello.hello);

module.exports = router;
