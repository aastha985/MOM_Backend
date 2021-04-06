const express = require("express");
router = express.Router();
user = require("../controller/user");

router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/profile", user.profile);
router.post("/createProfile", user.createProfile);
router.post("/isProfileCreated", user.IsProfileCreated);
router.post("/premium", user.premium);
router.post("/prescriptions", user.userPrescriptions);

// cart routes
router.post("/cart/:UserID/edit", user.updateCartItem);
router.post("/cart/:UserID/delete", user.deleteCartItem);
router.post("/cart/:UserID", user.insertCartItem);
router.get("/cart/:UserID", user.viewCart);

//order routes
router.post("/orders/new", user.createOrder);
router.post("/orders/confirm", user.placeOrder);
router.post("/orders", user.orders);
router.post("/orders/update", user.updateOrderStatus);

// doctor routes
router.post("/isDoctor", user.IsDoctor);
router.post("/doctor/createProfile", user.doctor);
router.post("/doctor/profile", user.doctorProfile);
router.post("/doctor/prescriptions", user.doctorPrescriptions);
router.post("/doctor/prescribe", user.prescribe);

module.exports = router;
