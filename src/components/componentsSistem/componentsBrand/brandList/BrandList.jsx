import React, { useState, useMemo, useEffect } from "react";
import { Button, Table, Form, Spinner } from "react-bootstrap";
import { FaTrash, FaPen, FaSearch } from 'react-icons/fa';
import "../../../../assets/style/theme.css" // importa el tema global
import { useBrands, useDeleteBrand } from "../../../../hooks/brands/useBrands";
import AddBrand from "../addBrand/AddBrand";
import UpdateBrand from "../updateBrand/UpdateBrand";
import ConfirmDelete from "../../confirmDelete/ConfirmDelete";

const DEBOUNCE_MS = 400;

export default function BrandList() {
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState("");
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // parámetros de búsqueda
  const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

  // Hook que trae las marcas
  const { data, isLoading, isError, error, refetch } = useBrands(params);
  const {mutate: deleteProduct, isLoading: isDeleting, mutateAsync: deleteProductAsync } = useDeleteBrand();

  // Debounce simple
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [q]);

  const brands = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.items)) return data.items;
    return [];
  }, [data]);

  const handleDeleteClick = (b) => {
        setProductToDelete(b);
        setShowConfirm(true);
    };
      const handleCancelDelete = () => {
        setProductToDelete(null);
        setShowConfirm(false);
    };
  const handleConfirmDelete = async () => {
        if (!productToDelete) return;
        console.log('Intentando eliminar producto (antes de llamar al hook):', productToDelete);

        try {
            if (deleteProductAsync) {
                // await la mutación y captura errores directamente
                await deleteProductAsync(productToDelete.id);

            } else {
                // fallback a mutate con callbacks
                await new Promise((resolve, reject) => {
                    deleteProduct(productToDelete.id, {
                        onSuccess: () => resolve(),
                        onError: (err) => reject(err),
                    });
                });
            }

            console.log('Respuesta: producto eliminado en backend.');
            if (typeof refetch === 'function') refetch();
            setShowConfirm(false);
            setProductToDelete(null);
        } catch (err) {
            console.error('Error al eliminar producto (catch):', err);
            alert(err?.message || 'Error al eliminar');
        }
    };

  return (
    <div className="page-center">
      <div className="component-card brand">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listado de Marcas</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
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
          <Button variant="outline-secondary" onClick={() => refetch()}>
            <FaSearch />
          </Button>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        ) : isError ? (
          <div className="text-danger">
            Error: {error?.message || "No se pudieron cargar las marcas"}
          </div>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">No hay marcas</td>
                </tr>
              ) : (
                brands.map((b) => (
                  <tr key={b.id ?? b.brandName}>
                    <td>{b.id}</td>
                    <td>{b.brandName}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          const id = Number(b?.id ?? b?.Id ?? b?.brandId);
                          if (!id) return;
                          setSelectedBrandId(id);
                          setShowEditModal(true);
                        }}
                      >
                        <FaPen />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(b)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
        <UpdateBrand
          show={showEditModal}
          onHide={() => { setShowEditModal(false); setSelectedBrandId(null); }}
          brandId={selectedBrandId}
          refetch={refetch}
        />
        <AddBrand
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          brands={brands}
          refetch={refetch}
        />
        <ConfirmDelete
          show={showConfirm}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          itemName={productToDelete?.productName}
          loading={isDeleting}
        />
      </div>
    </div>
  );
}
