const express = require("express");
router = express.Router();
medicineCompanies = require("../controller/medicineCompanies");

router.get("/topMedicines", medicineCompanies.topMedicines);
router.get("/rankingBySales", medicineCompanies.rankingBySales);
router.get("/login", medicineCompanies.login);
router.get("/stats/medicines", medicineCompanies.medicines);
router.get("/stats/medicineSales", medicineCompanies.medicineSales);

module.exports = router;
