const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middlewares');
const schemas = require('../schemas/schemas');


router.get('/:id', middleware.checkToken,
    middleware.traceRequest('getUserById'),
    middleware.logErrors('getUserById',  userController.getUserById));

router.get('/group/:id', middleware.checkToken,
    middleware.traceRequest('getUserGroupById'),
    middleware.logErrors('getUserGroupById',  userController.getUserGroupById));

router.get('/login/:login/limit/:limit', middleware.checkToken,
    middleware.traceRequest('getAutoSuggestUsers'),
    middleware.logErrors('getAutoSuggestUsers', userController.getAutoSuggestUsers));

router.post('/', middleware.checkToken,
    middleware.traceRequest('createOrUpdateUser'),
    middleware.validateSchema(schemas.userSchema),
    middleware.logErrors('createOrUpdateUser', userController.createOrUpdateUser));

router.post('/delete/:id', middleware.checkToken,
    middleware.traceRequest('deleteUser'),
    middleware.logErrors('deleteUser', userController.deleteUser));

module.exports = router;
