const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middlewares');
const schemas = require('../schemas/schemas');


router.get('/:id', userController.getUserById);

router.get('/login/:login/limit/:limit', userController.getAutoSuggestUsers);

router.post('/', middleware.validateSchema(schemas.userSchema), userController.createOrUpdateUser);

router.post('/delete/:id', userController.deleteUser);

module.exports = router;
