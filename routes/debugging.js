const express = require("express");
router = express.Router();
debugging = require("../controller/debugging");
const pool = require("../database.js");

router.get("/", debugging.features);

router.get("/database/:tableName/describe", debugging.describeTable);
router.get("/database/:tableName/showAllRows", debugging.showTableAllRows);
router.get("/database/:tableName/showAllColumnNames", debugging.showTableAllColumnNames);

module.exports = router;