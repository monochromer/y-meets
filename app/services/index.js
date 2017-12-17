// const servicesNames = [
//   'userService',
//   'roomService',
//   'eventService'
// ];

// const services = servicesNames.reduce((acc, cur) => ({
//   ...acc,
//   [cur]: require(`./${cur}`)
// }), {});

// module.exports = services

module.exports = {
  userService: require('./userService'),
  roomService: require('./roomService'),
  eventService: require('./eventService')
};
