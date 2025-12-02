import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { FaSearch, FaEye, FaTrash } from 'react-icons/fa';
import { useDeleteOrder, useOrders } from '../../../../hooks/order/useOrders'; // tu hook de órdenes
import "../../../../assets/style/theme.css" // importa el tema global
import OrderDetailModal from '../orderDetailModal/OrderDetailModal';
import ConfirmDelete from '../../confirmDelete/ConfirmDelete';

const DEBOUNCE_MS = 400;

export default function OrderList() {
    const [q, setQ] = useState('');
    const [debouncedQ, setDebouncedQ] = useState("");
    const [page] = useState(1);
    const [pageSize] = useState(50);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const STATUS_MAP = {
        0: "Pendiente",
        1: "Asignada",
        2: "Paga",
        3: "Completada",
        4: "Cancelada"
    };

    const PAYMENT_MAP = {
        0: "Efectivo",
        1: "Transferencia",
        2: "Débito",
        3: "Crédito"
    };

    const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

    // Hook que trae las órdenes
    const { data, isLoading, isError, error, refetch } = useOrders(params);
    const { mutate: deleteProduct, isLoading: isDeleting, mutateAsync: deleteProductAsync } = useDeleteOrder();
    // Debounce simple
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [q]);

    const orders = useMemo(() => {
        if (!data) return [];
        return Array.isArray(data) ? data : data.items ?? [];
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
            <div className="order-list-admin">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Listado de Órdenes</h2>
                </div>
                <div className="mb-3 d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Buscar Orden"
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
                    <div className="text-danger">Error: {error?.message || "No se pudieron cargar órdenes"}</div>
                ) : (
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Empleado</th>
                                <th>Cliente</th>
                                <th>Método de Pago</th>
                                <th>Total</th>
                                <th>Detalle</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center">No hay órdenes</td>
                                </tr>
                            ) : (
                                orders.map((o, i) => (
                                    <tr key={i}>
                                        <td>{o.id}</td>
                                        <td>{new Date(o.created).toLocaleDateString("es-AR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"

                                        })}</td>
                                        <td>{STATUS_MAP[o.status] ?? o.status}</td>
                                        <td>{o.employed?.userName}</td>
                                        <td>{o.user?.userName}</td>
                                        <td>{PAYMENT_MAP[o.buyMethod] ?? o.buyMethod}</td>
                                        <td>${o.total}</td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => { setSelectedOrder(o); setShowDetailModal(true); }}
                                            >
                                                <FaEye />
                                            </Button>
                                        </td>
                                        <td> <Button variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(o)}>
                                            <FaTrash />
                                        </Button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}

                {/* Modal de detalle de orden */}
                {showDetailModal && selectedOrder && (
                    <div className="modal-backdrop">
                        <div className="modal-content p-4">
                            <h4>Detalle de Orden #{selectedOrder.id}</h4>
                            <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                            <p><strong>Estado:</strong> {selectedOrder.status}</p>
                            <p><strong>Empleado:</strong> {selectedOrder.employee?.name}</p>
                            <p><strong>Cliente:</strong> {selectedOrder.client?.name}</p>
                            <p><strong>Método de Pago:</strong> {selectedOrder.paymentMethod}</p>
                            <p><strong>Total:</strong> ${selectedOrder.total}</p>
                            <h5>Productos:</h5>
                            <ul>
                                {selectedOrder.products?.map((p, idx) => (
                                    <li key={idx}>{p.productName} - {p.quantity} x ${p.unitPrice}</li>
                                ))}
                            </ul>
                            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Cerrar</Button>
                        </div>
                    </div>
                )}
            </div>
            {selectedOrder && (
                <OrderDetailModal
                    show={showDetailModal}
                    onHide={() => setShowDetailModal(false)}
                    order={selectedOrder}
                    STATUS_MAP={STATUS_MAP}
                    PAYMENT_MAP={PAYMENT_MAP}
                />)}
            <ConfirmDelete
                show={showConfirm}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                itemName={productToDelete?.productName}
                loading={isDeleting}
            />
        </div>

    );
}
