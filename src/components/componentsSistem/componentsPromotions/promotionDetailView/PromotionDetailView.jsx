// PromotionDetailView.jsx
import { Table } from "react-bootstrap";
import { PROMOTION_TYPE_MAP } from "../../../../services/helper/promotionConstans";

export default function PromotionDetailView({ promotion }) {
  return (
    <>
      <p><strong>Nombre:</strong> {promotion.promotionName}</p>
      <p><strong>Tipo:</strong> {PROMOTION_TYPE_MAP[promotion.type] ?? "Desconocido"}</p>
      <p><strong>Valor:</strong> {promotion.value}</p>
      <p><strong>Extra:</strong> {promotion.extra}</p>
      <p><strong>Activa:</strong> {promotion.isEnabled ? "Sí" : "No"}</p>

      <h5 className="mt-4">Productos asociados</h5>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Stock</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {promotion.products?.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.productName}</td>
              <td>${p.cost}</td>
              <td>{p.stock}</td>
              <td>{p.brand?.brandName ?? "Sin marca"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
