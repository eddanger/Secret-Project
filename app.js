var express = require('express');
var app = module.exports = express.createServer();
var port = 8080;

app.configure(function() {
  // app configuration
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.cookieDecoder());
  app.use(express.bodyDecoder());
  app.use(express.session());
  app.use(express.staticProvider(__dirname + '/public'));
});

require('./secret_socket');
require('./main');

app.listen(port);

console.log('Share your secrets on port ' + port );