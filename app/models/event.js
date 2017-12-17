const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const Event = sequelize.define('Event', {
    title: Sequelize.STRING,
    dateStart: Sequelize.DATE,
    dateEnd: Sequelize.DATE
  });

  return Event;
};
