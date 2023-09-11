const Message = require('../models/Message');
const Order = require('../models/Order');


exports.searchMessages = async (req, res) => {
  try {
    const { orderID, to, from } = req.body;
    console.log("order id is ",orderID);
    // Perform the search query
    let messages = await Message.findOne({ orderID: orderID });
    messages = [messages,];
    console.log(messages)
    res.json({ messages });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getMessages = async (req, res) => {
  try {
    // Retrieve messages from Orders collection
    const orders = await Order.find({ price: { $exists: true } }).populate('orderID', 'username');

    // Create separate documents in Messages collection
    const messages = [];
    for (const order of orders) {
      const { orderID, to, from, quantity, price, transporter } = order;
      const newMessage = new Message({ orderID, to, from, quantity, price, transporter });
      await newMessage.save();
      messages.push(newMessage);
    }
    // console.log("in get msg",messages)
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

