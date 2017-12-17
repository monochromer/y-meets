const path = require('path');
const { Server } = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const { sync } = require('app/models');
const { router: homeRoutes } = require('app/modules/home');
const { router: graphqlRoutes } = require('app/modules/graphql');

class App {
  constructor(config) {
    this._config = config;
    this._server = new Server();
    this._expressApp = express();
  }

  get config() {
    return this._config;
  }

  get server() {
    return this._server;
  }

  get expressApp() {
    return this._expressApp
  }

  onListening() {
    var addr = this.server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }

  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  mountRoutes(app, config) {
    app.use('/', homeRoutes);
    app.use('/graphql', graphqlRoutes);
    app.use(express.static(path.join(process.cwd(), 'app', 'public')));
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        const errorData = {
          message: err.message,
          error: (config.env === 'development') ? err : {}
        };
        res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <mata charset="utf-8" />
              <title>Shri 2018</title>
            </head>
            <body>
              <h4>${errorData.message}</h4>
              <pre><code>${JSON.stringify(errorData.error, null, 2)}</code></pre>
            </body>
          </html>
        `);
      });
  }

  configure(app, config) {
    app.use(bodyParser.json());
  }

  async run(done) {
    try {
      await sync();

      this.configure(this.expressApp, this.config);
      this.mountRoutes(this.expressApp, this.config);

      this.server
        .on('request', this.expressApp)
        .on('listening', this.onListening.bind(this))
        .on('error', this.onError.bind(this))
        .listen(this.config.PORT, () => {
          console.log(`Server is running on http://${this.config.IP}:${this.config.PORT}`);
          typeof done === 'function' && done();
        });
    } catch(err) {
      console.error(err);
      typeof done === 'function' && done(err);
    }
  }

  close(done) {
    this.server.close(done);
  }
}

module.exports = App;
