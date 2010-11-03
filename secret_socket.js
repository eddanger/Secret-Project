var currently_online = 0;
var json = JSON.stringify;

var Secret = require('./models/secret');

var app = module.parent.exports;

//Setup Socket.IO
var io = require('socket.io').listen(app);
io.on('connection', function(client) {

  console.log('Client Connected');
  
  currently_online++;
  client.send(json({'online': currently_online}));
  client.broadcast(json({'online': currently_online}));
  
  client.on('message', function(message) {
    var s = new Secret();
    s.body = message;

    s.save(function () {
      client.broadcast(json({'message': message }));
      client.send(json({'message': message }));
    });
  });

  client.on('disconnect', function() {
    client.broadcast(json({'online': --currently_online}));
    console.log('Client Disconnected.');
  });
});