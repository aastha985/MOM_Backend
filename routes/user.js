const express = require("express");
router = express.Router();
user = require("../controller/user");

router.post("/signup", user.signup);
router.get("/login", user.login);
router.get("/profile", user.profile);
router.post("/createProfile", user.createProfile);
router.get("/isProfileCreated", user.IsProfileCreated);
router.post("/premium", user.premium);
router.get("/prescriptions", user.userPrescriptions);

// cart routes
router.post("/cart/:UserID/edit", user.updateCartItem);
router.post("/cart/:UserID/delete", user.deleteCartItem);
router.post("/cart/:UserID", user.insertCartItem);
router.get("/cart/:UserID", user.viewCart);

//order routes
router.post("/orders/new", user.createOrder);
router.post("/orders/confirm", user.placeOrder);
router.get("/orders", user.orders);
router.post("/orders/update", user.updateOrderStatus);

// doctor routes
router.get("/isDoctor", user.IsDoctor);
router.post("/doctor/createProfile", user.doctor);
router.get("/doctor/profile", user.doctorProfile);
router.get("/doctor/prescriptions", user.doctorPrescriptions);
router.post("/doctor/prescribe", user.prescribe);

module.exports = router;
