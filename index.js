process.on('unhandledRejection', (err, p) => {
  console.log(`${err}`);
  process.exit(255);
});

const config = require('config');
const App = require('app/core/application');

const app = new App(config);
app.run();
