import React from 'react';
import { FaCreditCard, FaMoneyBillWave, FaPlusCircle } from 'react-icons/fa';
import './PaymentMethods.css';

const PaymentMethods = () => (
  <div className="payment-methods-container">
    <div className="payment-methods">
      <FaCreditCard size={24} style={{color:"#e81123"}} />
      <div>
        <strong>Pagá en cuotas</strong>
        <div className="method-link">Ver promociones bancarias</div>
      </div>
    </div>
    <div className="payment-methods">
      <FaCreditCard  size={24} style={{color:"#e81123"}}/>
      <div>
        <strong>Tarjeta de débito</strong>
        <div className="method-link">Ver más</div>
      </div>
    </div>
    <div className="payment-methods">
      <FaMoneyBillWave size={24} style={{color:"#e81123"}}/>
      <div>
        <strong>Efectivo</strong>
        <div className="method-link">Ver más</div>
      </div>
    </div>
    <div className="payment-methods">
      <FaPlusCircle size={24}  style={{color:"#e81123"}}/>
      <div>
        <strong>Más medios de pago</strong>
        <div className="method-link">Ver todos</div>
      </div>
    </div>
  </div>
);

export default PaymentMethods;