const {
  models: {
    Event
  }
} = require('app/models');

module.exports = {
  getEvent (id) {
    return Event.findById(id);
  },

  getEvents (args) {
    return Event.findAll(args);
  },

  createEvent ({ input, usersIds, roomId }) {
    return Event
      .create(input)
      .then(event => {
        event.setRoom(roomId);
        return event
          .setUsers(usersIds)
          .then(() => event);
      });
  },

  updateEvent ({ id, input }) {
    return Event
      .findById(id)
      .then(event => event.update(input));
  },

  removeEvent (id) {
    return Event
      .findById(id)
      .then(event => event.destroy());
  },

  removeUserFromEvent ({ id, userId }) {
    return Event
      .findById(id)
      .then(event => {
        return event
          .removeUser(userId)
          .then(() => event);
      });
  },

  addUserToEvent ({ id, userId }) {
    return Event
      .findById(id)
      .then(event => {
        return event
          .addUser(userId)
          .then(() => event)
      });
  },

  changeEventRoom ({ id, roomId }) {
    return Event
      .findById(id)
      .then(event => {
        event.setRoom(roomId);
        return event;
      });
  }
};
