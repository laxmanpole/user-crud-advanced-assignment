/* eslint-disable no-shadow */
const { error, success } = require('../utils');
const {
  getId, addUserValidation, updateUserValidation,
} = require('../validations');
const { userService } = require('../services');

const getList = async (req, res, next) => {
  try {
    const users = await userService.getList();
    return success.handler200({ users }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const getOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validateAsync(userId);
    const user = await userService.getOne({
      id,
    });
    return success.handler200({ user }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const {
      name,
      age,
      hobbies,
    } = await addUserValidation.validateAsync(reqBody);

    const user = await userService.addOne({
      name,
      age,
      hobbies,
    });
    return success.handler201({ user }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validateAsync(userId);
    const {
      name,
      age,
      hobbies,
    } = await updateUserValidation.validateAsync({ ...req.body });

    const item = await userService.updateOne({
      id,
      name,
      age,
      hobbies,
    });

    return success.handler200({ user: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const deleteOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validateAsync(userId);
    const user = await userService.deleteOne({
      id,
    });
    return success.handler204({ user }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
