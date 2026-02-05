// OrderStatusButtons.jsx
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import StatusIcon from '../statusIcons/StatusIcons';
import { ORDER_TRANSITIONS } from '../../../../services/helper/orderConstans';

export default function OrderStatusButtons({ order, onChangeStatus }) {
  if (!order) return null;

  const allowedStatuses = ORDER_TRANSITIONS[order.status] || [];

  if (allowedStatuses.length === 0) {
    return (
      <div className="mb-3">
        <h5>Orden #{order.id} está cancelada</h5>
        <p>Solo se puede eliminar.</p>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <h5>Cambiar estado de Orden #{order.id}</h5>
      <ButtonGroup>
        {allowedStatuses.map((s) => (
          <Button
            key={s}
            variant={order.status === s ? "primary" : "outline-primary"}
            onClick={() => onChangeStatus(order, s)}
            className="d-flex align-items-center justify-content-center"
          >
            <StatusIcon status={s} />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}