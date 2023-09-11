import React, { useEffect, useState } from 'react';
import messageService from '../../services/messageService';
import '../styles/Landing.css';
import Navbar from '../navbar';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [messages, setMessages] = useState([]);
  const [searchOrderID, setSearchOrderID] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchFrom, setSearchFrom] = useState('');
  const [userType, setUserType] = useState('');
  const [transporterID, setTransporterID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    fetchMessages();
    const userType = localStorage.getItem('userType');
    const storedTransporterID = localStorage.getItem('transporterID');
    setUserType(userType);
    setTransporterID(storedTransporterID);
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      navigate('/login');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await messageService.getMessages();
      setMessages(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await messageService.searchMessages(
        searchOrderID,
        searchTo,
        searchFrom
      );
      setMessages(response);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMessages =
    userType === 'Transporter'
      ? messages.filter((message) => message.transporter === transporterID)
      : messages;

  return (
    <div>
      <Navbar />
      <div className="landing-container">
        <h2>Dashboard</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search Order ID"
            value={searchOrderID}
            onChange={(e) => setSearchOrderID(e.target.value)}
            required
          />
          <input
            className="search-input"
            type="text"
            placeholder="Search To"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
          />
          <input
            className="search-input"
            type="text"
            placeholder="Search From"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        {userType === 'Transporter' && (
          <Link to="/transporter">
            <button className="form-button">Transporter Form</button>
          </Link>
        )}
        {userType === 'Manufacturer' && (
          <Link to="/manufacturer">
            <button className="form-button">Manufacturer Form</button>
          </Link>
        )}

        {userType === 'Transporter' && (
          <h2 className='logs'> Transporter Log</h2>
        )}
        {userType === 'Manufacturer' && (
          <h2 className='logs'> Manufacturer Log</h2>
        )}
        
        <ul className="message-list">
          {filteredMessages && filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <li key={message._id} className="message-item">
                <span className="message-field">
                  Order ID: {message.orderID}
                </span>
                <span className="message-field">To: {message.to}</span>
                <span className="message-field">From: {message.from}</span>
                <span className="message-field">
                  Quantity: {message.quantity}
                </span>
                <span className="message-field highlight">
                  Price: {message.price}
                </span>
                <span className="message-field">
                  Transporter ID: {message.transporter}
                </span>
              
              </li>
            ))
          ) : (
            <li className="no-messages">No messages found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
