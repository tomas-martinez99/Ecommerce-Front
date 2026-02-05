// src/components/Cart/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, incrementQty, decrementQty } from '../../../features/cart/cartSlice';
import { Card, Button, Badge, Alert, Form } from 'react-bootstrap';
import { useCreateOrder } from '../../../hooks/order/useOrders';
import { useSettings } from '../../../hooks/settings/useSettings';
import { useState } from 'react';
import { buildWhatsAppMessage } from '../../../services/helper/buildWhatsAppMessage';
import ConfirmOrderModal from '../confirmOrderModal/ConfirmOrderModal';

const Cart = () => {
    const items = useSelector(state => state.cart.items);
    const {data: settings} = useSettings();
    const phoneNumber = settings?.whatsAppNumber;
    const dispatch = useDispatch();
    const { mutate, isLoading, isError, error, isSuccess, data } = useCreateOrder();

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handlePurchase = () => {
        if (!paymentMethod) {
            alert("Por favor selecciona un método de pago");
            return;
        }

        const orderData = {
            userId: 1, // reemplaza con el ID del usuario actual
            status: 0, // Estado pendiente
            products: items.map(i => ({
                productId: i.id,
                unitPrice: i.price,
                quantity: i.qty,
            })),
            total: total,
            buyMethod: parseInt(paymentMethod),
        };
        console.log("Datos de la orden:", orderData);
        mutate(orderData, {
            onSuccess: () => {
                setShowModal(true);
            },
        });
    };

    const handleConfirmOrder = () => {
        const message = buildWhatsAppMessage(items, total, paymentMethod);
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
        dispatch(clearCart());
        setShowModal(false);
    };

    return (
        <div className="p-4">
            <h4>Carrito de compras</h4>
            {items.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    {items.map(item => (
                        <Card key={item.id} className="mb-3">
                            <Card.Body className="d-flex align-items-center">
                                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'contain' }} />
                                <div className="ms-3 flex-grow-1">
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>${item.price} x {item.qty}</Card.Text>
                                    {item.freeShipping && <Badge bg="success">Envío gratis</Badge>}
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => dispatch(decrementQty(item.id))}>-</Button>
                                    <span>{item.qty}</span>
                                    <Button variant="secondary" size="sm" onClick={() => dispatch(incrementQty(item.id))}>+</Button>
                                    <Button variant="danger" size="sm" onClick={() => dispatch(removeItem(item.id))}>Eliminar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                    <h5>Total: ${total.toFixed(2)}</h5>
                    <Form.Group className="mb-3">
                        <Form.Label>Método de pago</Form.Label>
                        <Form.Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Selecciona un método</option>
                            <option value={0}>Efectivo</option>
                            <option value={1}>Transferencia</option>
                            <option value={2}>Débito</option>
                            <option value={3}>Crédito</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="success" onClick={handlePurchase} disabled={isLoading}>
                        {isLoading ? "Procesando..." : "Comprar"}
                    </Button>
                    {isError && <Alert variant="danger">Error: {error.message}</Alert>}
                    {isSuccess && <Alert variant="success">Orden creada con éxito. ID: {data.id}</Alert>}
                    <Button variant="outline-dark" onClick={() => dispatch(clearCart())}>Vaciar carrito</Button>

                    <ConfirmOrderModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        items={items}
                        total={total}
                        paymentMethod={paymentMethod}
                        onConfirm={handleConfirmOrder}
                    />
                </>
            )
            }
        </div >
    );
};

export default Cart;