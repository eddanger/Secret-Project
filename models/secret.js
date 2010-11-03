var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/secrets');

mongoose.model('Secret', {
  properties: [
    'body',
    'created_at'
  ],
  
  methods: {
    save: function (fn) {
      this.created_at = new Date();
      this.__super__(fn);
    }
  }
});

module.exports = db.model('Secret');