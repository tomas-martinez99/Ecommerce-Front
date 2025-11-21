import React, { useState, useEffect, useRef } from 'react';
import { Nav } from 'react-bootstrap';
import './LeftNavbar.css';
import { FaCog, FaUsers, FaBoxOpen, FaShoppingCart, FaTruck, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Productos',
    key: 'productos',
    icon: <FaBoxOpen />,
    subItems: [
      { name: 'Listado de productos', icon: <FaBoxOpen />,to: "/productListAdmin" },
      { name: 'Marcas', icon: <FaBoxOpen /> ,to: "/brandList"},
      { name: 'Categorías', icon: <FaBoxOpen />, to: "/productGropList" },
    ],
  },
  {
    name: 'Usuarios',
    key: 'usuarios',
    icon: <FaUsers />,
    to: "/userList"
  },
  {
    name: 'Pedidos',
    key: 'pedidos',
    icon: <FaShoppingCart />,
    to: "/orderList"
  },
  {
    name: 'Proveedores',
    key: 'proveedores',
    icon: <FaTruck />,
    to: "/providerList"
  },
  {
    name: 'Estadísticas',
    key: 'estadisticas',
    icon: <FaChartBar />,
    to: "/statistics"
  },
];

const LeftNavbar = () => {
  const [expandedKey, setExpandedKey] = useState(null);
   const navbarRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat.subItems && cat.subItems.length > 0) {
      setExpandedKey(prev => (prev === cat.key ? null : cat.key));
    } else if (cat.to) {
      navigate(cat.to); // navega directo si no hay subitems
      setExpandedKey(null);
    }
  };

   return (
    <nav ref={navbarRef} className={`left-navbar ${expandedKey ? 'expanded' : ''}`}>
      <div className="navbar-icon-top">
        <FaCog size={32} />
      </div>
      <Nav className="flex-column left-navbar-nav">
        {categories.map(cat => (
          <div key={cat.key}>
            <Nav.Link
              className="left-navbar-link"
              onClick={() => handleClick(cat)}
            >
              <span className="navbar-link-icon">{cat.icon}</span>
              <span className="navbar-link-text">{cat.name}</span>
            </Nav.Link>
            {expandedKey === cat.key && cat.subItems && (
              <div className="sub-items">
                {cat.subItems.map((item, index) => (
                  <Nav.Link
                    key={index}
                    className="left-navbar-link sub-link"
                    onClick={() => navigate(item.to)}
                  >
                    <span className="navbar-link-icon">{item.icon}</span>
                    <span className="navbar-link-text">{item.name}</span>
                  </Nav.Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </Nav>
    </nav>
  );
};;

export default LeftNavbar;