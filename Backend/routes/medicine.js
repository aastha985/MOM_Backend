const express = require("express");
router = express.Router();
medicine = require("../controller/medicine");

router.post("/", medicine.allMedicines);
router.get("/show/:category", medicine.medicineByCategory);
router.post("/search", medicine.medicineByName);

module.exports = router;
