// orderConstants.js
export const STATUS_MAP = {
  0: "Pendiente",
  1: "Asignada",
  2: "Paga",
  3: "Completada",
  4: "Cancelada"
};

export const PAYMENT_MAP = {
  0: "Efectivo",
  1: "Transferencia",
  2: "Débito",
  3: "Crédito"
};

export const ORDER_TRANSITIONS = {
  0: [1, 4], // Pendiente → Asignada o Cancelada
  1: [2, 4], // Asignada → Paga o Cancelada
  2: [3, 4], // Paga → Completada o Cancelada
  3: [4],    // Completada → Cancelada
  4: [],     // Cancelada → solo eliminar (no hay transición)
};
