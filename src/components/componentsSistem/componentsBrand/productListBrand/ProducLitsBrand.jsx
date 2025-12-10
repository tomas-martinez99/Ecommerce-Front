import React, { useState } from "react";
import { Modal, Button, Table, Spinner, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useProductsByBrand } from "../../../../hooks/brands/useBrands";

export default function ProdListBrand({ show, onHide, brandId }) {
  const [q, setQ] = useState("");
  const { data, isLoading, isError, refetch, error } = useProductsByBrand(brandId, { q });

  // loguear siempre para ver cómo evoluciona la consulta
  console.log("estado productos por marca:", { data, isLoading, isError, error });

  // extraer productos de la respuesta
  const products = React.useMemo(() => {
    if (!data) return [];
    return Array.isArray(data.products) ? data.products : [];
  }, [data]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Productos de la marca {data?.brand?.brandName ?? data?.brandId ?? brandId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar Producto"
            style={{ maxWidth: 200 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => refetch()}>
            <FaSearch />
          </Button>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" />
          </div>
        ) : isError ? (
          <div className="text-danger">
            No se pudieron cargar los productos ({error?.message})
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted">No hay productos para esta marca</div>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {products.map((pr) => (
                <tr key={pr.id ?? pr.productId ?? pr.productName}>
                  <td>{pr.id ?? pr.productId ?? "-"}</td>
                  <td>{pr.productName ?? pr.name ?? "-"}</td>
                  <td>{pr.stock ?? "-"}</td>
                  <td>{pr.cost ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
}
