const {
  models: {
    User,
    Room,
    Event
  },
  sync
} = require('app/models');

const { users, rooms, events } = require('seed/mocks');

function createData () {
  let usersPromise = User.bulkCreate(users);
  let roomsPromise = Room.bulkCreate(rooms);
  let eventsPromise = Event.bulkCreate(events);

  return Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      User.findAll(),
      Room.findAll(),
      Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

if (!module.parent) {
  sync().then(createData);
} else {
  module.exports = createData;
}
