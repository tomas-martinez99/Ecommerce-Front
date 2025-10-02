import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer-main">
    <div className="footer-top">
      <div className="footer-logo">
        <img src="/src/assets/logo.png" alt="Logo" height={60} />
      </div>
      {/* <div className="footer-categories">
        <h6>Categorías</h6>
        <ul>
          <li><a href="/cascos">Cascos</a></li>
          <li><a href="/repuestos">Repuestos y accesorios</a></li>
          <li><a href="/cubiertas">Cubiertas</a></li>
          <li><a href="/indumentaria">Indumentaria</a></li>
          <li><a href="/lubricantes">Lubricantes</a></li>
          <li><a href="/baules">Baules y Soportes</a></li>
          <li><a href="/seguridad">Seguridad</a></li>
          <li><a href="/outdoor">Outdoor</a></li>
        </ul>
      </div> */}
      <div className="footer-contact">
        <h6>Contacto</h6>
        <ul>
          <li><FaFacebook /> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><FaInstagram /> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><FaEnvelope /> <a href="mailto:admneolandmotos@gmail.com">EmailDeContacto@gmail.com</a></li>
          <li>Tel: 3413108740</li>
          <li>Montevideo 4106 Rosario, Santa Fe</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div>
        <small>RepuestoMotosOnline © {new Date().getFullYear()} - Todos los derechos reservados</small>
      </div>
      
      <div className="footer-links">
        <a >Web desarollada por</a>
        <a href="#"><FaInstagram />Instagram</a> ·
      </div>
    </div>
  </footer>
);

export default Footer;
