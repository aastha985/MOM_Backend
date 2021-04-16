const express = require("express");
router = express.Router();
pharmacy = require("../controller/pharmacy");
const pool = require("../database.js");

router.post("/signup", pharmacy.signup);
router.post("/login", pharmacy.login);
router.post("/logout", pharmacy.logout);
router.post("/profile", pharmacy.profile);
router.post("/createProfile", pharmacy.createProfile);
router.post("/isProfileCreated", pharmacy.isProfileCreated);

router.post("/allOrders", pharmacy.allOrders);
router.post("/dueOrders", pharmacy.dueOrders);
router.post("/completedOrders", pharmacy.completedOrders);

module.exports = router;
