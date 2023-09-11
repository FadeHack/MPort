const Order = require('../models/Order');
const Auth = require('../models/User');

exports.getOrdersByTransporter = async (req, res) => {
  try {
    const { transporterId } = req.params;
    console.log("transporterID is : ",transporterId);
    const orders = await Order.find({ transporter: transporterId });
    console.log(orders)
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTransporters = async (req, res) => {
  try {
    const transporters = await Auth.find({ userType: 'Transporter' }, 'username');
    res.json({ transporters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { to, from, quantity, orderID, transporter } = req.body;

    // Create a new order
    const order = await Order.create({ to, from, quantity, transporter, orderID });

    res.json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateOrderPrice = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { price } = req.body;

    // Find and update the order
    const updatedOrder = await Order.findOneAndUpdate(
      { orderID },
      { $set: { price } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log("Price is : ",req.body);
    console.log('Order updated successfully', updatedOrder);
    res.json({ message: 'Order price updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


