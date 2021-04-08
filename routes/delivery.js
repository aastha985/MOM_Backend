const express = require("express");
router = express.Router();
delivery = require("../controller/delivery");

router.post('/agent/profile',delivery.agentProfile);
router.post('/agent/createProfile',delivery.createAgentProfile);
router.post('/agent/dueOrders',delivery.agentDueOrders);

router.post('/allOrders',delivery.allOrders);
router.post('/dueOrders',delivery.dueOrders);
router.post('/onDateOrders',delivery.onDateOrders);
router.post('/betweenDateOrders',delivery.betweenDateOrders);

module.exports = router;