import React, { useState } from "react";
import { Button, Table, Form, Spinner } from "react-bootstrap";
import { FaTrash, FaPen, FaSearch } from 'react-icons/fa';
import "../../../../assets/style/theme.css"
import { useDeleteBrand, useProductGroups } from "../../../../hooks/productGroups/useProductGroups";
import AddProductGroup from "../addProductGroup/AddProductGroup";
import UpdateProductGroup from "../updateProductGroup/UpdateProductGroup";
import ConfirmDelete from "../../confirmDelete/ConfirmDelete";

export default function ProductGroupList() {
  const [q, setQ] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { data, isLoading, isError, error, refetch } = useProductGroups();
  const { mutate: deleteProduct, isLoading: isDeleting, mutateAsync: deleteProductAsync } = useDeleteBrand();
  const productGroups = Array.isArray(data) ? data : [];


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
      <div className="component-card product-group">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">Listado de Grupos de Productos</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
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
            Error: {error?.message || "No se pudieron cargar los grupos"}
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
             {productGroups.map((pg) => (
                  <tr key={pg.id ?? pg.name}>
                    <td>{pg.id}</td>
                    <td>{pg.name}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          const id = Number(pg?.id ?? pg?.productGroupId);
                          if (!id) return;
                          setSelectedGroupId(id);
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
                        onClick={() => handleDeleteClick(pg)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
        <UpdateProductGroup
          show={showEditModal}
          onHide={() => { setShowEditModal(false); setSelectedGroupId(null); }}
          productGroupId={selectedGroupId}
          refetch={refetch}
        />
        <AddProductGroup
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
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
