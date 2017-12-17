const {
  models: {
    User,
    Room,
    Event
  }
} = require('app/models');

const {
  userService,
  roomService,
  eventService
} = require('app/services');

module.exports = {
  // User
  createUser (root, { input }, context) {
    // return User.create(input);
    return userService.createUser(input)
  },

  updateUser (root, { id, input }, context) {
    // return User
    //   .findById(id)
    //   .then(user => user.update(input));
    return userService.updateUser({ id, input })
  },

  removeUser (root, { id }, context) {
    // return User
    //   .findById(id)
    //   .then(user => user.destroy());
    return userService.removeUser(id)
  },

  // Room
  createRoom (root, { input }, context) {
    // return Room.create(input);
    return roomService.createRoom(input)
  },

  updateRoom (root, { id, input }, context) {
    // return Room
    //   .findById(id)
    //   .then(room => room.update(input));
    return roomService.updateRoom({ id, input })
  },

  removeRoom (root, { id }, context) {
    // return Room
    //   .findById(id)
    //   .then(room => room.destroy());
    return roomService.removeRoom(id);
  },

  // Event
  createEvent (root, { input, usersIds, roomId }, context) {
    // return Event
    //   .create(input)
    //   .then(event => {
    //     event.setRoom(roomId);
    //     return event
    //       .setUsers(usersIds)
    //       .then(() => event);
    //   });
    return eventService.createEvent({ input, usersIds, roomId })
  },

  updateEvent (root, { id, input }, context) {
    // return Event
    //   .findById(id)
    //   .then(event => event.update(input));
    return eventService.updateEvent({ id, input })
  },

  removeUserFromEvent (root, { id, userId }, context) {
    // return Event
    //   .findById(id)
    //   .then(event => {
    //     event.removeUser(userId);
    //     return event;
    //   });
    return eventService.removeUserFromEvent({ id, userId })
  },

  addUserToEvent(root, { id, userId }, context) {
    // return Event
    //   .findById(id)
    //   .then(event => {
    //     event.addUser(userId);
    //     return event;
    //   });
    return eventService.addUserToEvent({ id, userId });
  },

  changeEventRoom (root, { id, roomId }, context) {
    // return Event
    //   .findById(id)
    //   .then(event => event.setRoom(id));
    return eventService.changeEventRoom({ id, roomId });
  },

  removeEvent (root, { id }, context) {
    // return Event
    //   .findById(id)
    //   .then(event => event.destroy());
    return eventService.removeUser(id)
  }
};
