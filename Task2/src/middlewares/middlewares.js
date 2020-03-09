exports.logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
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

function respondWithValidationError(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return { status: 'failed', errors };
}
