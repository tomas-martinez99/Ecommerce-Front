import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../../../../assets/style/theme.css";
import { useProductGroups, useDeleteProductGroup } from "../../../../hooks/productGroups/useProductGroups";
import AddProductGroup from "../addProductGroup/AddProductGroup";
import UpdateProductGroup from "../updateProductGroup/UpdateProductGroup";
import ConfirmDelete from "../../confirmDelete/ConfirmDelete";
import ProductGroupTable from "../productGroupTable/ProducGroupTable";
import ProdListProductGroup from "../productListProductGroup/ProductListProducGroup"; // 👈 nuevo modal

export default function ProductGroupList() {
  const [q, setQ] = useState("");
  const [modal, setModal] = useState({ type: null, payload: null });

  const { data: groups = [], isLoading, isError, error, refetch } = useProductGroups({ q, page: 1, pageSize: 50 });
  const { mutateAsync: deleteGroup, isLoading: isDeleting } = useDeleteProductGroup();

  const handleDelete = async (group) => {
    try {
      await deleteGroup(group.id);
      refetch();
      setModal({ type: null, payload: null });
    } catch (err) {
      alert(err?.message || "Error al eliminar");
    }
  };

  return (
    <div className="page-center">
      <div className="component-card product-group">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">Listado de Grupos de Productos</h2>
          <Button variant="primary" onClick={() => setModal({ type: "add" })}>
            + Agregar Grupo
          </Button>
        </div>

        <div className="mb-3 d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar Grupo"
            style={{ maxWidth: 200 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={refetch}>
            <FaSearch />
          </Button>
        </div>

        {isLoading ? (
          <Spinner animation="border" />
        ) : isError ? (
          <div className="text-danger">Error: {error?.message}</div>
        ) : (
          <ProductGroupTable
            groups={groups}
            onEdit={(id) => setModal({ type: "edit", payload: id })}
            onDelete={(group) => setModal({ type: "delete", payload: group })}
            onViewProducts={(id) => setModal({ type: "products", payload: id })}
          />
        )}

        {modal.type === "edit" && (
          <UpdateProductGroup
            show
            onHide={() => setModal({ type: null })}
            productGroupId={modal.payload}
            refetch={refetch}
          />
        )}
        {modal.type === "add" && (
          <AddProductGroup
            show
            onHide={() => setModal({ type: null })}
            refetch={refetch}
          />
        )}
        {modal.type === "delete" && (
          <ConfirmDelete
            show
            onCancel={() => setModal({ type: null })}
            onConfirm={() => handleDelete(modal.payload)}
            itemName={modal.payload?.name}
            loading={isDeleting}
          />
        )}
        {modal.type === "products" && (
          <ProdListProductGroup
            show
            onHide={() => setModal({ type: null })}
            productGroupId={modal.payload}
          />
        )}
      </div>
    </div>
  );
}
