const express = require("express");
router = express.Router();
medicineCompanies = require("../controller/medicineCompanies");

router.get("/topMedicines", medicineCompanies.topMedicines);
router.get("/rankingBySales", medicineCompanies.rankingBySales);

module.exports = router;
