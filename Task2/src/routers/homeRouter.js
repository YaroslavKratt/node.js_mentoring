const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.post('/login', homeController.login);

module.exports = router;
