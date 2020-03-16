const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const token = jwt.sign({ user: req.body.login }, 'some secret');
    res.json(token);
};
