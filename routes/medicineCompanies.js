const express = require("express");
router = express.Router();
medicineCompanies = require("../controller/medicineCompanies");

router.get("/topMedicines", medicineCompanies.topMedicines);

module.exports = router;
