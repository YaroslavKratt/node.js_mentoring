const winston = require('../logger');

exports.handleError = (err, req, res, next) => {
    winston.logger.error(err.stack);
    res.status(500).send('Internal server error');
    next();
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

function respondWithValidationError(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return { status: 'failed', errors };
}
