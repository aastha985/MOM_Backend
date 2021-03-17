const express = require("express");
router = express.Router();
hello = require("../controller/hello");

router.get("/", hello.hello);

module.exports = router;
