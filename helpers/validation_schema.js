const Joi = require('@hapi/joi');

//falta buscar regex per la password
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    authSchema
}

