import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './FooterComponent.css';
import { ModalFooter } from 'react-bootstrap';

const FooterComponent = () => (
  <ModalFooter className="footer-main" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo" aria-hidden>
            <img src="/src/assets/logo.png" alt="RepuestoMotosOnline" />
          </div>

         <nav className="footer-categories" aria-label="Categorías">
            <h6>Categorías</h6>
            <ul>
              <li><a href="#cat1">Categoría 1</a></li>
              <li><a href="#cat2">Categoría 2</a></li>
              <li><a href="#cat3">Categoría 3</a></li>
              <li><a href="#cat4">Categoría 4</a></li>
            </ul>
          </nav>

        <address className="footer-contact">
            <h6>Contacto</h6>
            <ul>
              <li>Email: <a href="mailto:EmailDeContacto@gmail.com">EmailDeContacto@gmail.com</a></li>
              <li>Tel: 3413108740</li>
              <li>Montevideo 4106, Rosario, Santa Fe</li>
            </ul>
          </address>
        </div>

      <div className="footer-bottom">
          <div className="copyright">
            RepuestoMotosOnline © {new Date().getFullYear()} - Todos los derechos reservados
          </div>
          <div className="credits">
            Web desarrollada por <a href="#" aria-label="Desarrollador">Tu Empresa</a>
          </div>
        </div>
      </div>
    </ModalFooter>
);

export default FooterComponent;
