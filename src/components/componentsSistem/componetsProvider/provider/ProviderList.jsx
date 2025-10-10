import React from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import "./ProviderList.css";

const products = [
  { id: "#7676", desc: "Inverter", marca: "cat1", img: "Store name", editar: "Stock adjustment", stock: "80/100", status: "Completed" },
  { id: "#7676", desc: "Battery", marca: "cat2", img: "Store name", editar: "Stock adjustment", stock: "80/100", status: "Pending" },
  // ...otros productos
];

export default function ProviderList() {
  return (
   
      <div className="content">
        <header className="header-bar">
          <h1>Listado de productos</h1>
          <Button variant="primary">+ Agregar Producto</Button>
        </header>
        <div className="table-section">
          <Form.Control type="text" placeholder="Quick search" className="mb-3" style={{ maxWidth: 250 }} />
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th><Form.Check type="checkbox" /></th>
                <th>ID</th>
                <th>Descripcion</th>
                <th>Marca</th>
                <th>IMG</th>
                <th>Editar</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td><Form.Check type="checkbox" /></td>
                  <td>{p.id}</td>
                  <td>{p.desc}</td>
                  <td>{p.marca}</td>
                  <td>{p.img}</td>
                  <td>{p.editar}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span className={`status-badge ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
  );
}