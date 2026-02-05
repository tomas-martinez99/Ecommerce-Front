// OrderRow.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEye, FaTrash } from 'react-icons/fa';
import StatusIcon from '../statusIcons/StatusIcons';

export default function OrderRow({
  order,
  STATUS_MAP,
  PAYMENT_MAP,
  onView,
  onDelete,
  onSelect,
  isSelected
}) {
  return (
    <tr
      className={isSelected ? "table-active" : ""}
      onClick={() => onSelect(order)}
      style={{ cursor: "pointer" }}
    >
      <td>{order.id}</td>
      <td>{new Date(order.created).toLocaleDateString("es-AR")}</td>
      <td><StatusIcon status={order.status} /></td>
      <td>{order.employed?.userName}</td>
      <td>{order.user?.userName}</td>
      <td>{PAYMENT_MAP[order.buyMethod] ?? order.buyMethod}</td>
      <td>${order.total}</td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onView(order); }}
        >
          <FaEye />
        </Button>
      </td>
      <td>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onDelete(order); }}
        >
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
}