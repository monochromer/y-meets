const view = require('./indexView');

module.exports = {
  index: function (req, res) {
    res.send(view());
  }
}
