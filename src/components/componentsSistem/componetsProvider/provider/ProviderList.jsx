import React from "react";
import { Container, Row, Col, Button, Table, Form, InputGroup } from "react-bootstrap";
import { FaTrash, FaCamera, FaPen, FaSearch } from 'react-icons/fa';
import "./ProviderList.css";

const products = [
  { id: "#7676", name: "Inverter", address: "cat1", delete: <FaTrash /> },
  { id: "#7676", name: "Battery", address: "cat2", delete: <FaTrash /> },
  // ...otros productos
];

export default function ProviderList() {
  return (

    <div className="content">
      <header className="header-bar">
        <h1>Listado de Proveedores</h1>
        <Button style={{ marginLeft: '15px' }} variant="primary">+ Agregar Proveedor</Button>
      </header>
      <div className="table-section">
        <InputGroup style={{ maxWidth: 350 }}>
          <Form.Control placeholder="Buscar Proveedor" />
          <Button variant="outline-success"><FaSearch /></Button>
        </InputGroup>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td> <Button variant="outline-danger" size="sm">
                  <FaTrash />
                </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}