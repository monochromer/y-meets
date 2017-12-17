const fileList = ['users', 'rooms', 'events'];

const mocks = fileList.reduce((acc, cur) => {
  acc[cur] = require(`./${cur}`)
  return acc;
}, {});

module.exports = mocks
