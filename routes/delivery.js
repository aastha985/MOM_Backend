const express = require("express");
router = express.Router();
delivery = require("../controller/delivery");

router.get('/profile',delivery.profile);
router.post('/createProfile',delivery.createProfile);

module.exports = router;