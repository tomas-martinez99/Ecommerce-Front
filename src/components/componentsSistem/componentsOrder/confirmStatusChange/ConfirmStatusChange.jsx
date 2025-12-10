// ConfirmStatusChange.jsx
import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import StatusIcon from "../statusIcons/StatusIcons";

export default function ConfirmStatusChange({
  show,
  onCancel,
  onConfirm,
  order,
  newStatus,
  loading,
  employees = []
}) {
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleConfirm = () => {
    if (newStatus === 1 && !selectedEmployee) {
      alert("Debes seleccionar un empleado");
      return;
    }
    onConfirm(selectedEmployee);
  };

  if (!order) return null;

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar cambio de estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Seguro que deseas cambiar el estado de la orden <strong>#{order.id}</strong>?
        </p>
        <div className="d-flex gap-3 align-items-center mb-3">
          <span>Nuevo estado:</span>
          <StatusIcon status={newStatus} />
        </div>

        {newStatus === 1 && (
          <Form.Group>
            <Form.Label>Seleccionar empleado</Form.Label>
            <Form.Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.userName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Confirmar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
