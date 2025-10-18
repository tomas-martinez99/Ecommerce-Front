import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form, Spinner } from "react-bootstrap";
import { FaTrash, FaCamera, FaPen, FaSearch } from 'react-icons/fa';
import "./ProviderList.css";
import { useProviders } from "../../../../hooks/providers/useProviders";
import AddProvider from "../addProvider/AddProvider";
import UpdateProvider from "../updateProvider/UpdateProvider"

const DEBOUNCE_MS = 400;

export default function ProviderList() {
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState("");
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Pagina simple por ahora, podés exponer page/pageSize si lo necesitás
  const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

  // Hook que trae los productos (usa react-query)
  const { data, isLoading, isError, error, refetch } = useProviders(params);

  // Debounce simple
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [q]);

  const providers = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.items)) return data.items;
    return [];
  }, [data]);

  return (
    <div className="page-center">
      <div className="provider">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">Listado de Proveedores</h2>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            + Agregar Proveedor</Button>
        </div>
        <div className="mb-3 d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar Proveedor"
            style={{ maxWidth: 200 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => refetch()}>
            <FaSearch />
          </Button>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center py-5" >
            <Spinner animation="border" />
          </div>
        ) : isError ? (
          <div className="text-danger">Error: {error?.message || "No se pudieron cargar los proveedores"}</div>
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
              {providers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">No hay proveedores</td>
                </tr>
              ) : (
                providers.map((p) => (
                  <tr key={p.id ?? p.providerName}>
                    <td>{p.id}</td>
                    <td>{p.providerName}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          const id = Number(p?.id ?? p?.Id ?? p?.providerId);
                          if (!id) return; // evita abrir modal sin id válido
                          setSelectedProviderId(id);
                          setShowEditModal(true);
                        }}
                      >
                        <FaPen />
                      </Button>
                    </td>
                    <td> <Button variant="outline-danger" size="sm" >
                      <FaTrash />
                    </Button></td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
        <UpdateProvider
          show={showEditModal}
          onHide={() => { setShowEditModal(false); setSelectedProviderId(null); }}
          providerId={selectedProviderId}
          refetch={refetch}
        />
        <AddProvider show={showAddModal}
          onHide={() => setShowAddModal(false)}
          providers={providers}
          refetch={refetch} />
      </div>
    </div >
  );
}