// ProductTable.jsx
import { Table, Button } from "react-bootstrap";

export default function ProductTable({ promotion, setPromotion }) {
  const handleRemove = (id) => {
    setPromotion({ ...promotion, products: promotion.products.filter(p => p.id !== id) });
  };
  console.log(promotion.products, "Productos de la poromo")
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre</th>
          <th>Costo</th>
          <th>Stock</th>
          <th>Categoria</th>
          <th>Marca</th>
          <th>Proveedor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {promotion.products?.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.productName}</td>
            <td>${p.cost}</td>
            <td>{p.stock}</td>
            <td>{p.productGroup.name}</td>
            <td>{p.brand.brandName ?? "Sin marca"}</td>
            <td>{p.provider.providerName}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => handleRemove(p.id)}>
                Quitar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
