import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';
import Navbar from '../navbar';
import '../styles/TransporterForm.css';

const TransporterForm = () => {
  const [orderID, setOrderID] = useState('');
  const [price, setPrice] = useState('');
  const [orders, setOrders] = useState([]);
  const [transporterId, setTransporterId] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders(transporterId);
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    };

    const tId = localStorage.getItem('transporterID');
    setTransporterId(tId);

    fetchOrders();
  }, [transporterId]);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const selectedOrder = orders.find((order) => order.orderID === orderID);
      if (selectedOrder) {
        await orderService.replyToOrder(orderID, price);
      }
      alert(`Replied to the order with a price of ${price}`);
      setOrderID('');
      setPrice('');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="transporter-form-container">
        <h2>Transporter Form</h2>
        <form className="transporter-form" onSubmit={handleReply}>
          <select
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            required
          >
            <option value="">Select Order ID</option>
            {orders.map((order) => (
              <option key={order._id} value={order.orderID}>
                {order.orderID} - {order.from} to {order.to} - Quantity:{' '}
                {order.quantity} - Transporter: {order.transporter}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button className="reply-button" type="submit">
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransporterForm;
