import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export default function OrderDetailModal({ show, onHide, order, STATUS_MAP, PAYMENT_MAP, employees = [], onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  useEffect(() => {
    if (order) {
      setEditedOrder({
        ...order,
        employedId: order.employed?.id || ""   // 👈 inicializa el select con el empleado actual
      });
    }
  }, [order]);

  if (!order) return null;

  // 🔹 recalcular total cada vez que cambian productos
  useEffect(() => {
    if (isEditing) {
      const newTotal = editedOrder.products?.reduce(
        (acc, p) => acc + p.unitPrice * p.quantity,
        0
      );
      setEditedOrder((prev) => ({ ...prev, total: newTotal }));
    }
  }, [editedOrder.products, isEditing]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...editedOrder.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value,
    };
    setEditedOrder({ ...editedOrder, products: updatedProducts });
  };

  const handleChange = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleSave = () => {
    onEdit(editedOrder); // 👈 dispara la edición hacia el padre (OrderList)
    setIsEditing(false);
    console.log(editedOrder, "Order editada")
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? `Editar Orden #${order.id}` : `Detalle de Orden #${order.id}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditing ? (
          <>
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
          </>
        ) : (
          <>
            {/* Estado */}
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={editedOrder.status}
                onChange={(e) => handleChange("status", Number(e.target.value))}
              >
                {Object.entries(STATUS_MAP).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Empleado */}
            <Form.Group className="mb-3">
              <Form.Label>Empleado asignado</Form.Label>
              <Form.Select
                value={editedOrder.employedId || ""}
                onChange={(e) => handleChange("employedId", Number(e.target.value))}
              >
                <option value="">-- Selecciona --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.userName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* Medio de Pago */}
            <Form.Group className="mb-3">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select
                value={editedOrder.buyMethod}
                onChange={(e) => handleChange("buyMethod", Number(e.target.value))}
              >
                {Object.entries(PAYMENT_MAP).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Total */}
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" value={editedOrder.total} readOnly />
            </Form.Group>


            {/* Productos */}
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
                {editedOrder.products?.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.productId}</td>
                    <td>{p.productName}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={p.unitPrice}
                        onChange={(e) => handleProductChange(idx, "unitPrice", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={p.quantity}
                        onChange={(e) => handleProductChange(idx, "quantity", e.target.value)}
                      />
                    </td>
                    <td>${p.unitPrice * p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        {!isEditing ? (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <FaEdit /> Editar
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSave}>
              Guardar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
