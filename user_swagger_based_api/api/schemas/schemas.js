const Joi = require('@hapi/joi');


exports.userSchema = Joi.object({
    _id: Joi.string(),
    login: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$'))
        .required(),
    name:Joi.string(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .required()
});
