const express = require("express");
router = express.Router();
delivery = require("../controller/delivery");

router.get('/agent/profile',delivery.agentProfile);
router.post('/agent/createProfile',delivery.createAgentProfile);

module.exports = router;