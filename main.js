var app = module.parent.exports;

var Secret = require('./models/secret');

app.get('/', function(req, res) {

  Secret.find().limit(3).all(function(docs) {
    res.render('index.jade', {
      locals: {secrets: docs}
    });
  });

});
