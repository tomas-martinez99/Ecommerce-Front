import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { FaTrash, FaCamera, FaPen, FaSearch } from 'react-icons/fa';
import './ProductListAdmin.css';
import { useDeleteProduct, useProductsProvider, useUpdateProduct } from '../../../../hooks/products/useProducts.js';
import AddProduct from '../addProduct/AddProduct.jsx';
import { useProviders } from '../../../../hooks/providers/useProviders.js';
import UpdateProduct from '../updateProduct/UpdateProduct.jsx';
import ConfirmDelete from '../../confirmDelete/ConfirmDelete.jsx';


const DEBOUNCE_MS = 400;

export default function ProductListAdmin() {
    const [q, setQ] = useState('');
    const [debouncedQ, setDebouncedQ] = useState("");
    const [page] = useState(1);
    const [pageSize] = useState(50);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct, isLoading: isDeleting, mutateAsync: deleteProductAsync } = useDeleteProduct();
    const { data: providers } = useProviders();

    // Pagina simple por ahora, podés exponer page/pageSize si lo necesitás
    const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

    // Hook que trae los productos (usa react-query)
    const { data, isLoading, isError, error, refetch } = useProductsProvider(params);

    const handleDeleteClick = (p) => {
        setProductToDelete(p);
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
    console.log("Providers:", providers);

    return (
        <div className="page-center">
            <div className="product-list-admin">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Listado de productos</h2>
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        + Agregar Producto</Button>
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
                    <div className="d-flex justify-content-center py-5" >
                        <Spinner animation="border" />
                    </div>
                ) : isError ? (
                    <div className="text-danger">Error: {error?.message || "No se pudieron cargar productos"}</div>
                ) : (
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                <th>Stock</th>
                                <th>Marca</th>
                                <th>Familia de Producto</th>
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
                                        <td>{p.sku}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.price}</td>
                                        <td>{p.provider.providerName}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.brand}</td>
                                        <td>{p.familyGroup}</td>
                                        <td><Button variant="outline" size="sm">
                                            <FaCamera />
                                        </Button></td>
                                        <td><Button variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedProduct(p);
                                                setShowEditModal(true);
                                            }}>
                                            <FaPen />
                                        </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(p)} 
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
                <AddProduct show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    providers={providers}
                    refetch={refetch} />
                <UpdateProduct
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    product={selectedProduct}
                    providers={providers}
                    refetch={refetch}
                    onUpdate={(id, payload, options) => updateProduct({ id, payload }, options)}
                />
                <ConfirmDelete
                    show={showConfirm}
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    itemName={productToDelete?.productName}
                    loading={isDeleting}
                />
            </div>
        </div >
    );
}