const winston = require('../logger');
const jwt = require('jsonwebtoken');


exports.handleError = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    winston.logger.error(err.stack);
    res.status(500).send('Internal server error');
};

exports.validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error !== undefined && error.isJoi) {
            res.status(400).json(respondWithValidationError(error.details));
        } else {
            return  next();
        }
    };
};

exports.traceRequest = (methodName) => {
    return (req, res, next) => {
        winston.logger.info(`${req.method}: ${req.originalUrl} => ${methodName}
        with params: ${JSON.stringify(req.params)},
        query params ${JSON.stringify(req.query)},
        and body ${JSON.stringify(req.body)}`);
        next();
    };
};

exports.logErrors = (methodName, method) => {
    return (req, res) => {
        try {
            return method.call(this, req, res);
        } catch (err) {
            winston.logger.error(`Error: ${err.message} in "${methodName}"
              with: body: ${JSON.stringify(req.body)},
                query: ${JSON.stringify(req.query)},
                params: ${JSON.stringify(req.params)}`);
            throw err;
        }
    };
};

exports.checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'some secret', (err) => {
            if (err) {
                res.status(403).send('Forbidden Error');
            } else {
                return  next();
            }
        });
    } else {
        res.status(401).send('Unauthorized Error');
    }
};

function respondWithValidationError(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return { status: 'failed', errors };
}
