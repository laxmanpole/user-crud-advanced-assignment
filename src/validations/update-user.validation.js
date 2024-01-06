/* eslint-disable no-useless-escape */
const Joi = require('joi');

module.exports = Joi.object()
  .keys({
    name: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .label('First Name'),
    age: Joi.number().positive()
      .label('Age'),
    hobbies: Joi.array().items(Joi.string()).allow().empty()
      .label('Hobbies'),
  }).min(1);
