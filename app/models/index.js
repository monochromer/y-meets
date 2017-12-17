const Sequelize = require('sequelize');
const { Op } = Sequelize;

const config = require('config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.dbStorage,
  operatorsAliases: { $and: Op.and },
  logging: false
});

const User = require('./user')(sequelize);
const Room = require('./room')(sequelize);
const Event = require('./event')(sequelize);

Event.belongsToMany(User, { through: 'Events_Users' });
User.belongsToMany(Event, { through: 'Events_Users' });
Event.belongsTo(Room);

module.exports = {
  sequelize,
  sync: () => sequelize.sync(),
  models: sequelize.models
}
