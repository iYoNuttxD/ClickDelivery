import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏢 ClickDelivery
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/orders" className="navbar-link">📦 Pedidos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/delivery" className="navbar-link">🚚 Entregas</Link>
          </li>
          <li className="navbar-item">
            <Link to="/events" className="navbar-link">📊 Eventos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;