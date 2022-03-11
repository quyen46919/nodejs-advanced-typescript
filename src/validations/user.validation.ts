var Joi = require('joi');

const createNewUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().min(4).max(20).required(),
        address: Joi.string().max(255).required()
    }),
};

module.exports = {
    createNewUser
}