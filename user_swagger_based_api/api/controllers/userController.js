const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    res.json(await userService.getAllUsers());
};

exports.getUserById = async (req, res) => {
    await userService.getUserById(req.params.id)
        .then((user) => {
            if (user === null) {
                throw new Error(`User with id ${req.params.id} not found`);
            }
            res.json(user);
        })
        .catch((err) =>  res.status(404).send(err.message));
};

exports.createOrUpdateUser = async (req, res) => {
    res.json(`${ await userService.createOrUpdateUser(req.body)}`);
};

exports.getAutoSuggestUsers = async (req, res) => {
    res.json(await userService.getAutoSuggestUsers(req.params.login, req.params.limit));
};

exports.deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id).then((deletInfo) => {
        if (deletInfo.deletedCount === 0) {
            throw new Error(`User with id ${req.params.id} not found`);
        }
        res.status(200).send(`User with id ${req.params.id} was deleted`);
    })
        .catch((err) =>  res.status(404).send(err.message));
};
