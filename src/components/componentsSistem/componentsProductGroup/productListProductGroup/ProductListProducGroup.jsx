import React, { useState } from "react";
import { Modal, Button, Table, Spinner, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useProductsByProducGroup } from "../../../../hooks/productGroups/useProductGroups";

export default function ProdListProductGroup({ show, onHide, productGroupId }) {
  const [q, setQ] = useState("");
  const { data, isLoading, isError, refetch, error } = useProductsByProducGroup(productGroupId, { q });

  console.log("estado productos por grupo:", { data, isLoading, isError, error });

  const products = React.useMemo(() => {
    if (!data) return [];
    return Array.isArray(data.products) ? data.products : [];
  }, [data]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Productos del grupo {data?.productGroup?.name ?? data?.productGroupId ?? productGroupId}
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
          <div className="text-center text-muted">No hay productos para este grupo</div>
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
