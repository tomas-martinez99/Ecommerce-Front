import React from 'react';
import { FaTruck, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import './Benefits.css';

const Benefits = () => (
  <div className="benefits-container">
    <div className="benefit-item">
      <FaTruck size={40} className="benefit-icon" />
      <h5>Realizamos envios a todo el pais</h5>
      <p>Tus paquetes están seguros. Realizamos todos los envios por correo argentino.</p>
    </div>
    <div className="benefit-item">
      <FaCreditCard size={40} className="benefit-icon" />
      <h5>Elegí tu medio de pago favorito</h5>
      <p>Pagá con tarjeta o en efectivo.</p>
    </div>
    <div className="benefit-item">
      <FaMobileAlt size={40} className="benefit-icon" />
      <h5>Atencion 24 hs</h5>
      <p>Comunicate con nosotros a cualquier hora los 7 dias de la semana.</p>
    </div>
  </div>
);

export default Benefits;