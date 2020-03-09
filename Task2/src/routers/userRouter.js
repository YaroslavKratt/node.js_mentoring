const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middlewares');
const schemas = require('../schemas/schemas');


router.get('/:id', middleware.traceRequest('getUserById'), userController.getUserById);

router.get('/login/:login/limit/:limit', middleware.traceRequest('getAutoSuggestUsers'),
    userController.getAutoSuggestUsers);

router.post('/',  middleware.traceRequest('createOrUpdateUser'),
    middleware.validateSchema(schemas.userSchema), userController.createOrUpdateUser);

router.post('/delete/:id', middleware.traceRequest('deleteUser'), userController.deleteUser);

module.exports = router;
