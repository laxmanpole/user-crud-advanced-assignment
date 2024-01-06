/* eslint-disable no-useless-escape */
const Joi = require('joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .required()
      .label('First Name'),
    age: Joi.number().positive().required()
      .label('Age'),
    hobbies: Joi.array().items(Joi.string()).allow().empty()
      .required()
      .label('Hobbies'),
  });
