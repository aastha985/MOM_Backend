const express = require("express");
router = express.Router();
delivery = require("../controller/delivery");

router.get('/agent/profile',delivery.agentProfile);
router.post('/agent/createProfile',delivery.createAgentProfile);
router.get('/agent/dueOrders',delivery.agentDueOrders);

module.exports = router;