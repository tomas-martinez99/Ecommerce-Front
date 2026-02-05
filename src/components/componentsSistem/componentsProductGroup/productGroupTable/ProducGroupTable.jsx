import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaPen, FaBoxOpen } from "react-icons/fa";

export default function ProductGroupTable({ groups, onEdit, onDelete, onViewProducts }) {
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
        {groups.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">
              No hay grupos de productos
            </td>
          </tr>
        ) : (
          groups.map((pg) => (
            <tr key={pg.id}>
              <td>{pg.id}</td>
              <td>{pg.name}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => onViewProducts(pg.id)}
                  title="Ver productos del grupo"
                >
                  <FaBoxOpen /> Ver
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onEdit(pg.id)}
                  title="Editar grupo"
                >
                  <FaPen />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(pg)}
                  title="Eliminar grupo"
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

