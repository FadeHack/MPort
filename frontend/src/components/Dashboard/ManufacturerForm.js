import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';
import Navbar from '../navbar';
import '../styles/ManufacturerForm.css';

const ManufacturerForm = () => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transporter, setTransporter] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    fetchTransporters();
  }, []);

  const fetchTransporters = async () => {
    try {
      const response = await orderService.getTransporters();
      setTransporters(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await orderService.sendOrder(to, from, quantity, transporter, orderID);
      // Clear the form
      setTo('');
      setFrom('');
      setQuantity('');
      setTransporter('');
      setOrderID('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="manufacturer-form-container">
        <h2>Manufacturer Form</h2>
        <form className="manufacturer-form" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Create An Order ID"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        >
          <option value="">Select Quantity</option>
          <option value="1ton">1 ton</option>
          <option value="2ton">2 tons</option>
          <option value="3ton">3 tons</option>
        </select>
          <select
            value={transporter}
            onChange={(e) => setTransporter(e.target.value)}
            required
          >
            <option value="">Select Transporter</option>
            {transporters.map((transporter) => (
              <option key={transporter._id} value={transporter._id}>
                {transporter.username}
              </option>
            ))}
          </select>
          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManufacturerForm;
