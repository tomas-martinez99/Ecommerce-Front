import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { FaTrash, FaCamera, FaPen, FaSearch } from 'react-icons/fa';
import './ProductListAdmin.css';
import { useProducts } from '../../../../hooks/products/useProducts.js';

const DEBOUNCE_MS = 400;

export default function ProductListAdmin() {
    const [q, setQ] = useState('');
    const [debouncedQ, setDebouncedQ] = useState("");
    const [page] = useState(1);
    const [pageSize] = useState(50);

    // Pagina simple por ahora, podés exponer page/pageSize si lo necesitás
    const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

    // Hook que trae los productos (usa react-query)
    const { data, isLoading, isError, error, refetch } = useProducts(params);

    // Debounce simple
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [q]);

    const products = useMemo(() => {
        if (!data) return [];
        return Array.isArray(data) ? data : data.items ?? [];
        
        
    }, [data]);
    console.log("Products:", products);
    console.log("Data:", data);

    return (
        <div className="page-center">
            <div className="product-list-admin">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Listado de productos</h2>
                    <Button variant="primary">+ Agregar Producto</Button>
                </div>
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
                    <div className="d-flex justify-content-center py-5">
                        <Spinner animation="border" />
                    </div>
                ) : isError ? (
                    <div className="text-danger">Error: {error?.message || "No se pudieron cargar productos"}</div>
                ) : (
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                <th>Stock</th>
                                <th>Marca</th>
                                <th>IMG</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center">No hay productos</td>
                                </tr>
                            ) : (
                                products.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.id}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.price}</td>
                                        <td>{p.provider}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.brand}</td>
                                        <td><Button variant="outline" size="sm">
                                            <FaCamera />
                                        </Button></td>
                                        <td><Button variant="outline" size="sm">
                                            <FaPen />
                                        </Button>
                                        </td>
                                        <td>
                                            <Button variant="outline-danger" size="sm">
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}