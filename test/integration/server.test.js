const path = require('path');
const { request } = require('http');
const { URL } = require('url');
const { assert } = require('chai');

const config = require('config');
const App = require('app/core/application');

describe('server test', () => {
  let app;

  before(done => {
    app = new App(config);
    app.run(done);
  });

  after(done => {
    app.close(done);
  });

  it('should return correct home view', (done) => {
    const view = require('app/modules/home/indexView')();
    const options = new URL(`http://${config.IP}:${config.PORT}`);

    let req = request(options, (res) => {
      let body = [];
      res.on('data', (chunk) => { body.push(chunk) });
      res.on('end', () => {
        body = Buffer.concat(body).toString();
        assert.equal(res.statusCode, 200);
        assert.equal(body, view);
        done();
      });
    });

    req.on('error', (e) => {
      assert.isNull(e, null);
      done(e);
    });

    req.end();
  });

  it('should return correct status code on `graphql` route', (done) => {
    const options = {
      hostname: `${config.IP}`,
      port: config.PORT,
      path: '/graphql',
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    };

    let req = request(options, (res) => {
      res.on('end', () => {
        assert.equal(res.statusCode >= 200 && res.statusCode < 400, true);
        done();
      });
    });

    req.on('error', (e) => {
      assert.isNull(e, null);
      done(e);
    });

    req.end();
  });
})
