import React from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { PROMOTION_TYPE_MAP } from "../../../../services/helper/promotionConstans";

export default function PromotionTable({ promotions, onEdit, onDelete, onViewDetail,onToggle}){
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>tipo</th>
          <th>Activa</th>
          <th>Detalle</th>
          <th>Eliminar</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {promotions.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">
              No hay promociones
            </td>
          </tr>
        ) : (
          promotions.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.promotionName}</td>
              <td>{PROMOTION_TYPE_MAP[p.type]}</td>
              <td>{p.isEnabled ? "Sí" : "No"}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => onViewDetail(p.id)}
                  title="Ver detalle"
                >
                  <FaEye /> Ver
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(p)}
                  title="Eliminar promoción"
                >
                  <FaTrash />
                </Button>
              </td>
              <td>
                <FormCheck
                  type="switch"
                  id={`switch-${p.id}`}
                  label={p.isEnabled ? "Activa" : "Inactiva"}
                  checked={p.isEnabled}
                  onChange={() => onToggle(p)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
