var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('messages', messageSchema);
