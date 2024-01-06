/* eslint-disable no-unused-vars */
const { getSuccessPayload } = require('../payload');
const STATUS = require('../status');

/**
 * Handler success and send appropriate response
 * @param data
 * @param req
 * @param res
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
const handler200 = (data, req, res, next) => {
  const payload = getSuccessPayload(data);
  return res.status(STATUS.OK).send(payload);
};

const handler201 = (data, req, res, next) => {
  const payload = getSuccessPayload(data);
  return res.status(STATUS.CREATED).send(payload);
};

const handler204 = (data, req, res, next) => {
  const payload = getSuccessPayload(data);
  return res.status(STATUS.NO_CONTENT).send(payload);
};

module.exports = {
  handler200,
  handler201,
  handler204,
};
