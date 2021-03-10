const express = require("express");
router = express.Router();
hello = require("../controller/hello");

router.get("/api/", hello.hello);

module.exports = router;
