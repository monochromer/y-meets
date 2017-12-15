module.exports.index = function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <mata charset="utf-8" />
        <title>Shri 2018</title>
      </head>
      <body>
        <h1>Hello</h1>
        <script async src="/scripts/test.js"></script>
      </body>
    </html>
  `);
};
