const http = require('http');
const url = require('url');
const server = require('./lib/server');
const logger = require('./lib/logger');

server(http, (req, res) => {

  const parsedUrl = url.parse(req.url,true); //true parameter returns also the queryString

  const path =  parsedUrl.pathname;
  const trimmedPath = path.replace(/^\+|\/+$/g, '');

  const queryStringObject = parsedUrl.query;

  const method = req.method.toUpperCase();

  const headers = req.headers;

  res.end('Hello World');

  logger.info(`${method} ${trimmedPath || '/'}. Complete headers: ${JSON.stringify(headers, null, 2)}`);
}).listen();
