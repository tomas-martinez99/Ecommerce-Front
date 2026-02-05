import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaPen, FaBoxOpen } from "react-icons/fa";

export default function BrandTable({ brands, onEdit, onDelete, onViewProducts }) {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Productos</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {brands.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">
              No hay marcas
            </td>
          </tr>
        ) : (
          brands.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.brandName}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => onViewProducts(b.id)}
                  title="Ver productos de la marca"
                >
                  <FaBoxOpen /> Ver
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onEdit(b.id)}
                  title="Editar marca"
                >
                  <FaPen />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(b)}
                  title="Eliminar marca"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}