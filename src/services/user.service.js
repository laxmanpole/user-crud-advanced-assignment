const { v4: uuidv4 } = require('uuid');
const { error } = require('../utils');

let users = [];

const getList = async () => users;

const getOne = async ({ id }) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return error.throwNotFound({ custom_key: 'UserNotFound', item: 'User' });
  }

  return user;
};

const addOne = async ({
  name,
  age,
  hobbies,
}) => {
  const newUser = {
    id: uuidv4(),
    name,
    age,
    hobbies,
  };
  users.push(newUser);
  return newUser;
};

const updateOne = async ({
  id, name, age, hobbies,
}) => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return error.throwNotFound({ custom_key: 'UserNotFound', item: 'User' });
  }
  const userIndex = users.findIndex((u) => u.id === id);
  users[userIndex] = {
    ...users[userIndex],
    name,
    age,
    hobbies: hobbies || [],
  };
  return users[userIndex];
};

const deleteOne = async ({ id }) => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return error.throwNotFound({ custom_key: 'UserNotFound', item: 'User' });
  }
  users = users.filter((u) => u.id !== id);
  return user;
};

module.exports = {
  getList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
