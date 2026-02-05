// OrderList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDeleteOrder, useOrders, useUpdateOrder, useUpdateOrderStatus } from '../../../../hooks/order/useOrders';
import "../../../../assets/style/theme.css";
import OrderDetailModal from '../orderDetailModal/OrderDetailModal';
import ConfirmDelete from '../../confirmDelete/ConfirmDelete';
import { STATUS_MAP, PAYMENT_MAP } from '../../../../services/helper/orderConstans';
import OrderRow from '../orderRow/OrderRow';
import OrderStatusButtons from '../orderStatusButton/OrderStatusButton';
import ConfirmStatusChange from '../confirmStatusChange/ConfirmStatusChange';
import { useEmployees } from '../../../../hooks/users/useEmployess';

const DEBOUNCE_MS = 400;

export default function OrderList() {
    const [q, setQ] = useState('');
    const [debouncedQ, setDebouncedQ] = useState("");
    const [page] = useState(1);
    const [pageSize] = useState(50);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [showConfirmStatus, setShowConfirmStatus] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);

    const params = useMemo(() => ({ q: debouncedQ, page, pageSize }), [debouncedQ, page, pageSize]);

    const { mutateAsync: updateStatus, isLoading: isUpdatingStatus } = useUpdateOrderStatus()
    const { data, isLoading, isError, error, refetch } = useOrders(params);
    const { mutateAsync: deleteOrder, isLoading: isDeleting } = useDeleteOrder();
    const {data: employees = [], isLoading: isLoadingE} = useEmployees();
     const { mutateAsync: updateOrder, isLoading: isUpdating } = useUpdateOrder();
    
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQ(q.trim()), DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [q]);

    const orders = useMemo(() => {
        if (!data) return [];
        return Array.isArray(data) ? data : data.items ?? [];
    }, [data]);

    const handleDeleteClick = (order,) => {
        setOrderToDelete(order);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!orderToDelete) return;
        try {
            await deleteOrder(orderToDelete.id);
            refetch();
            setShowConfirm(false);
            setOrderToDelete(null);
        } catch (err) {
            alert(err?.message || 'Error al eliminar');
        }
    };

    const handleChangeStatusClick = (order, newStatus) => {
        setSelectedOrder(order);
        setPendingStatus(newStatus);
        setShowConfirmStatus(true);
    };

    const handleConfirmStatus = async (employeeId) => {
        try {
            const payload =
                pendingStatus === 1
                    ? { newStatus: pendingStatus, employeeId: Number(employeeId) }
                    : { newStatus: pendingStatus };

            await updateStatus({ id: selectedOrder.id, payload });
            refetch(); // refresca la lista
            setSelectedOrder({ ...selectedOrder, status: pendingStatus });
            setShowConfirmStatus(false);
            setPendingStatus(null);
        } catch (err) {
            alert(err?.message || "Error al cambiar estado");
        }
    };

    
  const handleEditOrder = async (editedOrder) => {
    try {
      const payload = {
        status: editedOrder.status,
        employedId: editedOrder.employedId,
        buyMethod: editedOrder.buyMethod,
        total: editedOrder.total,
        products: editedOrder.products.map(p => ({
          productId: p.productId,
          productName: p.productName,
          unitPrice: p.unitPrice,
          quantity: p.quantity
        }))
      };

      await updateOrder({ id: editedOrder.id, payload });
      refetch(); // refresca la lista
      alert("Orden actualizada correctamente");
    } catch (err) {
      alert(err?.message || "Error al actualizar la orden");
    }
  };


    return (
        <div className="page-center">
            <div className="order-list-admin">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Listado de Órdenes</h2>
                </div>

                {/* Buscador */}
                <div className="mb-3 d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Buscar Orden"
                        style={{ maxWidth: 200 }}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={refetch}>
                        <FaSearch />
                    </Button>
                </div>

                {/* Botonera de estados */}
                <OrderStatusButtons
                    order={selectedOrder}
                    onChangeStatus={handleChangeStatusClick}
                />

                {/* Tabla */}
                {isLoading ? (
                    <div className="d-flex justify-content-center py-5">
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
                                    <td colSpan={9} className="text-center">No hay órdenes</td>
                                </tr>
                            ) : (
                                orders.map((o) => (
                                    <OrderRow
                                        key={o.id}
                                        order={o}
                                        STATUS_MAP={STATUS_MAP}
                                        PAYMENT_MAP={PAYMENT_MAP}
                                        onView={(order) => { setSelectedOrder(order); setShowDetailModal(true); }}
                                        onDelete={handleDeleteClick}
                                        onSelect={setSelectedOrder}
                                        isSelected={selectedOrder?.id === o.id}
                                    />
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Modal de detalle */}
            {selectedOrder && (
                <OrderDetailModal
                    show={showDetailModal}
                    onHide={() => setShowDetailModal(false)}
                    order={selectedOrder}
                    STATUS_MAP={STATUS_MAP}
                    PAYMENT_MAP={PAYMENT_MAP}
                    employees={employees}
                    onEdit={handleEditOrder}
                />
            )}

            {/* Confirmación de borrado */}
            <ConfirmDelete
                show={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirmDelete}
                itemName={`Orden #${orderToDelete?.id}`}
                loading={isDeleting}
            />

            <ConfirmStatusChange
                show={showConfirmStatus}
                onCancel={() => setShowConfirmStatus(false)}
                onConfirm={handleConfirmStatus}
                order={selectedOrder}
                newStatus={pendingStatus}
                loading={isUpdatingStatus}
                employees={employees}
            />
        </div>
    );
}