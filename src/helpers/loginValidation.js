const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().min(6).email().lowercase().required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    loginSchema
}