const logger = require('./logger');

module.exports = function Server(http, cb) {
  // Properties
  const _server = http.createServer(cb);

  // Private methods
  const print = data => {
      logger.info(data);
  };


  return {
    listen: (port, cb) => {
      if (typeof cb === 'function'){
        _server.listen(port, cb);
      } else {
        let defaultPort = +port || 3000;
        _server.listen(defaultPort, () => print(`Listening on port ${defaultPort}`))
      }
      return this;
    },
  };
};



