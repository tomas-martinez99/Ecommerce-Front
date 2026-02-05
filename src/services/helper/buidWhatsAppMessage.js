// src/utils/buildWhatsAppMessage.js
export const buildWhatsAppMessage = (items, total, paymentMethod) => {
  const productsText = items
    .map(i => `${i.name} x${i.qty} - $${i.price * i.qty}`)
    .join("\n");

  const paymentText = ["Efectivo", "Transferencia", "Débito", "Crédito"][paymentMethod] || "";

  return `Hola! Quiero hacer este pedido:\n\n${productsText}\n\nTotal: $${total}\nMétodo de pago: ${paymentText}`;
};