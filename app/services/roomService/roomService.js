const {
  models: {
    Room
  }
} = require('app/models');

module.exports = {
  getRoom (id) {
    return Room.findById(id);
  },

  getRooms (args) {
    return Room.findAll(args);
  },

  createRoom (input) {
    return Room.create(input);
  },

  updateRoom ({ id, input }) {
    return Room
      .findById(id)
      .then(room => room.update(input));
  },

  removeRoom (id) {
    return Room
      .findById(id)
      .then(room => room.destroy());
  }
};
