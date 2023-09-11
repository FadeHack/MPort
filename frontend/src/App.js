import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/Start/StartPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/Dashboard/Landing';
import ManufacturerForm from './components/Dashboard/ManufacturerForm';
import TransporterForm from './components/Dashboard/TransporterForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manufacturer" element={<ManufacturerForm />} />
        <Route path="/transporter" element={<TransporterForm />} />
        <Route path="/dashboard" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
