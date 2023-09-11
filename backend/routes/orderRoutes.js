const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/transporter/:transporterId', orderController.getOrdersByTransporter);
router.get('/transporters', orderController.getTransporters);
router.post('/', orderController.createOrder);
router.put('/:orderID', orderController.updateOrderPrice);

module.exports = router;
