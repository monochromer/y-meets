const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const Room = sequelize.define('Room', {
    title: Sequelize.STRING,
    capacity: Sequelize.SMALLINT,
    floor: Sequelize.TINYINT
  });

  return Room;
};
