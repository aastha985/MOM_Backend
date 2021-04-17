const express = require("express");
router = express.Router();
medicineCompanies = require("../controller/medicineCompanies");

router.get("/topMedicines", medicineCompanies.topMedicines);
router.get("/rankingBySales", medicineCompanies.rankingBySales);
router.post("/login", medicineCompanies.login);
router.post("/logout", medicineCompanies.logout);
router.get("/:CompanyID/medicines", medicineCompanies.medicines);
router.get("/:CompanyID/medicineSales", medicineCompanies.medicineSales);

module.exports = router;
