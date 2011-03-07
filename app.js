require.paths.unshift('./vendor')

var express = require('express');
var app = module.exports = express.createServer();
var port = 8080;

app.configure(function() {
  // app configuration
  app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: "secret project secret key" }));
  app.use(express.static(__dirname + '/public'));
});

require('./secret_socket');
require('./main');

app.listen(port);

console.log('Share your secrets on port ' + port );