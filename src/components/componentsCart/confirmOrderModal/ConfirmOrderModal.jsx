// src/components/Cart/ConfirmOrderModal.jsx
import { Modal, Button } from "react-bootstrap";

const ConfirmOrderModal = ({ show, onHide, items, total, paymentMethod, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Productos:</h5>
        <ul>
          {items.map(i => (
            <li key={i.id}>
              {i.name} x{i.qty} - ${i.price * i.qty}
            </li>
          ))}
        </ul>
        <h5>Total: ${total}</h5>
        <p>Método de pago: {["Efectivo","Transferencia","Débito","Crédito"][paymentMethod]}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="success" onClick={onConfirm}>Enviar por WhatsApp</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmOrderModal;
