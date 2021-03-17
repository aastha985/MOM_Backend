const express = require("express");
router = express.Router();
medicine = require("../controller/medicine");
const pool = require("../database.js");

router.get("/", medicine.allMedicines);
router.get("/show/:category", medicine.medicineByCategory);
router.get("/search", medicine.medicineByName);

module.exports = router;
