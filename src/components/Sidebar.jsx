import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import "../App.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/order">Order Form</Link></li>
        <li><Link to="/history">Order-History</Link></li>
        <li><Link to="/tracker"> Tracker</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
