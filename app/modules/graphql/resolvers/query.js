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
  event (root, { id }) {
    // return Event.findById(id);
    return eventService.getEvent(id);
  },

  events (root, args, context) {
    // return Event.findAll(args, context)
    return eventService.getEvents(args)
  },

  user (root, { id }) {
    // return User.findById(id);
    return userService.getUser(id);
  },

  users (root, args, context) {
    // return User.findAll({}, context);
    return userService.getUsers(args)
  },

  room (root, { id }) {
    // return Room.findById(id);
    return roomService.getRoom(id);
  },

  rooms (root, args, context) {
    // return Room.findAll(args, context);
    // return Room.findAll();
    return roomService.getRooms(args)
  }
};
