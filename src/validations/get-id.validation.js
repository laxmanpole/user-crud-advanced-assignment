const Joi = require('joi');

module.exports = Joi.string().guid({ version: 'uuidv4' }).required().label('Id');
