const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');

const controller = new Controller();

router.post('/create-issue',controller.createIssue);
router.post('/complete-status',controller.statusComplete);




module.exports = router;
