const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    enum: ['1ton', '2ton', '3ton'],
    required: true,
  },
  transporter: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
