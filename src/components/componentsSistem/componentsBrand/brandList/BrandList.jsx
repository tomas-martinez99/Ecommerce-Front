import React, { useState, useMemo, useEffect } from "react";
import { Button, Table, Form, Spinner } from "react-bootstrap";
import { FaTrash, FaPen, FaSearch } from 'react-icons/fa';
import "../../../../assets/style/theme.css" // importa el tema global
import { useBrands, useDeleteBrand } from "../../../../hooks/brands/useBrands";
import AddBrand from "../addBrand/AddBrand";
import UpdateBrand from "../updateBrand/UpdateBrand";
import ConfirmDelete from "../../confirmDelete/ConfirmDelete";
import { useDebounce } from "../../../../hooks/common/useDebounge";
import BrandTable from "../bradnTable/BrandTable";
import ProdListBrand from "../productListBrand/ProducLitsBrand";


export default function BrandList() {
  const [q, setQ] = useState("");
  const [debouncedQ] = useDebounce(q, 400);
  const [modal, setModal] = useState({ type: null, payload: null });

  const { data: brands = [], isLoading, isError, error, refetch } = useBrands({ q: debouncedQ, page: 1, pageSize: 50 });
  const { mutateAsync: deleteBrand, isLoading: isDeleting } = useDeleteBrand();

  const handleDelete = async (brand) => {
    try {
      await deleteBrand(brand.id);
      refetch();
      setModal({ type: null, payload: null });
    } catch (err) {
      alert(err?.message || "Error al eliminar");
    }
  };

  return (
    <div className="page-center">
      <div className="component-card brand">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listado de Marcas</h2>
          <Button variant="primary" onClick={() => setModal({ type: "add" })}>
            + Agregar Marca
          </Button>
        </div>

        <div className="mb-3 d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar Marca"
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
          <BrandTable
            brands={brands}
            onEdit={(id) => setModal({ type: "edit", payload: id })}
            onDelete={(brand) => setModal({ type: "delete", payload: brand })}
            onViewProducts={(id) => setModal({ type: "products", payload: id })}
          />
        )}

        {modal.type === "edit" && (
          <UpdateBrand show onHide={() => setModal({ type: null })} brandId={modal.payload} refetch={refetch} />
        )}
        {modal.type === "add" && (
          <AddBrand show onHide={() => setModal({ type: null })} brands={brands} refetch={refetch} />
        )}
        {modal.type === "delete" && (
          <ConfirmDelete
            show
            onCancel={() => setModal({ type: null })}
            onConfirm={() => handleDelete(modal.payload)}
            itemName={modal.payload?.brandName}
            loading={isDeleting}
          />
        )}
        {modal.type === "products" && (
          <ProdListBrand
            show
            onHide={() => setModal({ type: null })}
            brandId={modal.payload}
          />)}
      </div>
    </div>
  );
}
