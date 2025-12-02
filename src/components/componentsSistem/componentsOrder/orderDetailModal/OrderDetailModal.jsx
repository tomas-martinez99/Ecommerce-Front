import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

export default function OrderDetailModal({ show, onHide, order, STATUS_MAP, PAYMENT_MAP }) {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Orden #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Fecha:</strong>{" "}
          {new Date(order.created).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
        <p><strong>Estado:</strong> {STATUS_MAP[order.status]}</p>
        <p><strong>Empleado:</strong> {order.employed?.userName ?? "Sin asignar"}</p>
        <p><strong>Cliente:</strong> {order.user?.userName ?? "Desconocido"}</p>
        <p><strong>Método de Pago:</strong> {PAYMENT_MAP[order.buyMethod]}</p>
        <p><strong>Total:</strong> ${order.total}</p>

        <h5 className="mt-4">Productos</h5>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products?.map((p, idx) => (
              <tr key={idx}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>${p.unitPrice}</td>
                <td>{p.quantity}</td>
                <td>${p.unitPrice * p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
