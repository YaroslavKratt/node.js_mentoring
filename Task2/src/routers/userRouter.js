const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/:id', userController.getUserById);

router.get('/login/:login/limit/:limit', userController.getAutoSuggestUsers);

router.post('/', userController.createOrUpdateUser);

router.post('/delete/:id', userController.deleteUser);

module.exports = router;
