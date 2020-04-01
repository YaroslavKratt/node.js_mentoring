const userService = require('../services/userService');

exports.getUserById = (req, res) => {
    try {
        res.json(userService.getUserById(req.params.id));
    } catch (e) {
        console.log(e);
        res.status(404).send(e.message);
    }
};

exports.createOrUpdateUser = (req, res) => {
    req.body.id = userService.createIdForNewUser(req.body);
    userService.storage.set(req.body.id, req.body);
    res.send(`id: ${req.body.id}`);
};

exports.getAutoSuggestUsers = (req, res) => {
    res.json(userService.getAutoSuggestUsers(req.params.login, req.params.limit));
};

exports.deleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    res.sendStatus(200);
};
