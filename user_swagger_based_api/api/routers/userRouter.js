const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middlewares');
const schemas = require('../schemas/schemas');

router.get('/:id', middleware.traceRequest('getUserById'),
    middleware.logErrors('getUserById',  userController.getUserById));

router.post('/', middleware.traceRequest('createOrUpdateUser'),
    middleware.validateSchema(schemas.userSchema),
    middleware.logErrors('createOrUpdateUser', userController.createOrUpdateUser));

router.get('/', middleware.traceRequest('getAllUsers'),
    middleware.logErrors('createOrUpdateUser', userController.getAllUsers));


router.get('/login/:login/limit/:limit', middleware.traceRequest('getAutoSuggestUsers'),
    middleware.logErrors('getAutoSuggestUsers', userController.getAutoSuggestUsers));

router.post('/delete/:id',
    middleware.traceRequest('deleteUser'),
    middleware.logErrors('deleteUser', userController.deleteUser));

module.exports = router;
