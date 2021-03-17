const express = require("express");
router = express.Router();
user = require("../controller/user");

router.post("/signup", user.signup);
router.get("/login", user.login);
router.get("/profile", user.profile);
router.post("/createProfile", user.createProfile);
router.get("/isProfileCreated", user.IsProfileCreated);
router.post("/premium", user.premium);

// doctor routes
router.get("/isDoctor", user.IsDoctor);
router.post("/doctor/createProfile", user.doctor);
router.get("/doctor/profile", user.doctorProfile);

module.exports = router;
