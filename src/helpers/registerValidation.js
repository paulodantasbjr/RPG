const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().lowercase().required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    registerSchema
}