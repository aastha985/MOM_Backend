const express = require("express");
router = express.Router();
pharmacy = require("../controller/pharmacy");
const pool = require("../database.js");

router.get("/", pharmacy.allPharmacies);
router.get("/profile/:pharmacyID", pharmacy.profile);

module.exports = router;