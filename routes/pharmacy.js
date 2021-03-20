const express = require("express");
router = express.Router();
pharmacy = require("../controller/pharmacy");
const pool = require("../database.js");

router.get("/signup", pharmacy.signup);
router.get("/login", pharmacy.login);
router.get("/profile", pharmacy.profile);
router.post("/createProfile", pharmacy.createProfile);
router.get("/isProfileCreated", pharmacy.isProfileCreated);

router.get("/allOrders", pharmacy.allOrders);
router.get("/dueOrders", pharmacy.dueOrders);
router.get("/completedOrders", pharmacy.completedOrders);

module.exports = router;