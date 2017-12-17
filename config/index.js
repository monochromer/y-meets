const path = require('path');

const dbNameMap = {
  'development': 'db.dev.sqlite3',
  'test': 'db.test.sqlite3',
  'production': 'db.sqlite3',
  get default() {
    return this['production'];
  }
};

module.exports = {
    env: process.env.NODE_ENV || 'development',
    IP: process.env.IP || 'localhost',
    PORT: process.env.PORT || 3000,

    get dbDataFolder() {
      return 'dbdata';
    },

    get dbStorage() {
      var fileName = dbNameMap[this.env]
        ? dbNameMap[this.env]
        : dbNameMap['default'];

      return path.join(process.cwd(), this.dbDataFolder, fileName);
    }
}
