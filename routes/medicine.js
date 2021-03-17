const express = require("express");
router = express.Router();
medicine = require("../controller/medicine");
const pool = require("../database.js");

router.get("/", medicine.allMedicines);

module.exports = router;
