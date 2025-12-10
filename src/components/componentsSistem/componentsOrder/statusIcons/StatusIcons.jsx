// StatusIcon.jsx
import React from 'react';
import './StatusIcon.css';

export default function StatusIcon({ status }) {
  const config = {
    0: { className: "status-pendiente", letter: "P" },
    1: { className: "status-asignada", letter: "A" },
    2: { className: "status-paga", letter: "C" },
    3: { className: "status-completada", letter: "F" },
    4: { className: "status-cancelada", letter: "X" },
  };

  const { className, letter } = config[status] || { className: "status-pendiente", letter: "?" };

  return (
    <span className={`status-icon ${className}`}>
      {letter}
    </span>
  );
}