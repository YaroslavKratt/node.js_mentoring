const winston = require('../logger');

exports.handleError = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    winston.logger.error(err.stack);
    res.status(500).send('Internal server error');
};
