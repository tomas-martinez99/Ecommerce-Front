import React from 'react';
import { Nav } from 'react-bootstrap';
import './LeftNavbar.css';
import { FaCog, FaUsers, FaBoxOpen, FaShoppingCart, FaTruck,FaChartBar } from 'react-icons/fa';

const categories = [
  { name: 'Listado de productos', href: '/dashboard', icon: <FaBoxOpen /> },
  { name: 'Usuarios', href: '/productos', icon: <FaUsers /> },
  { name: 'Pedidos', href: '/pedidos', icon: <FaShoppingCart /> },
  { name: 'Proveedores', href: '/providerList', icon: <FaTruck /> },
  { name: 'Estadisticas', href: '/usuarios', icon: <FaChartBar /> },
];

const LeftNavbar = () => (
  <nav className="left-navbar">
    <div className="navbar-icon-top">
      <FaCog size={32} />
    </div>
    <Nav className="flex-column left-navbar-nav">
      {categories.map(cat => (
        <Nav.Link key={cat.href} href={cat.href} className="left-navbar-link">
          <span className="navbar-link-icon">{cat.icon}</span>
          <span className="navbar-link-text">{cat.name}</span>
        </Nav.Link>
      ))}
    </Nav>
  </nav>
);

export default LeftNavbar;