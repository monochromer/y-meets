const {
  models: {
    User
  }
} = require('app/models');

module.exports = {
  getUser (id) {
    return User.findById(id);
  },

  getUsers (args) {
    return User.findAll(args);
  },

  createUser (input) {
    return User.create(input);
  },

  updateUser ({ id, input }) {
    return User
      .findById(id)
      .then(user => user.update(input));
  },

  removeUser (id) {
    return User
      .findById(id)
      .then(user => user.destroy());
  }
};
