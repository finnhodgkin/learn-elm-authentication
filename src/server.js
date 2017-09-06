const hapi = require('hapi');
const inert = require('inert');
const routes = require('./routes');

require('env2')('config.env');

const server = new hapi.Server();

server.connection({ port: process.env.PORT || 4000 });

server.register([inert], err => {
  if (err) throw err;

  server.route(routes);
});

module.exports = server;
