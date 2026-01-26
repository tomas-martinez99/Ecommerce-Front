import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {PROMOTION_TYPE_MAP} from "../../../../services/helper/promotionConstans"

export default function PromotionCreateModal({ show, onHide, onCreate }) {
    const [promotion, setPromotion] = useState({
        promotionName: "",
        type: "0", // valores: "discount", "twoforone"
        value: 0,
        extra: 0,
        isEnabled: true,
        products: []
    });

    const handleSave = () => {
        // transformar según tu backend
        const payload = {
            ...promotion,
            productIds: promotion.products.map(p => p.id)
        };
        onCreate(payload);
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Crear nueva promoción</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de la promoción</Form.Label>
                        <Form.Control
                            type="text"
                            value={promotion.promotionName}
                            onChange={(e) =>
                    
                                 setPromotion({ ...promotion, type: Number(e.target.value) })
                                 
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de promoción</Form.Label>
                        <Form.Select
                            value={promotion.type}
                            onChange={(e) =>
                                setPromotion({ ...promotion, type: e.target.value })
                            }
                        >
                            {Object.entries(PROMOTION_TYPE_MAP).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {promotion.type === "0" && (
                        <Form.Group className="mb-3">
                            <Form.Label>Porcentaje de descuento</Form.Label>
                            <Form.Control
                                type="number"
                                value={promotion.value}
                                onChange={(e) =>
                                    setPromotion({ ...promotion, value: Number(e.target.value) })
                                }
                            />
                            <Form.Text className="text-muted">
                                Este valor representa el porcentaje de descuento aplicado.
                            </Form.Text>
                        </Form.Group>
                    )}

                    {promotion.type === "1" && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad que se entrega(X)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={promotion.value}
                                    onChange={(e) =>
                                        setPromotion({ ...promotion, value: Number(e.target.value) })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad que se paga (Y)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={promotion.extra}
                                    onChange={(e) =>
                                        setPromotion({ ...promotion, extra: Number(e.target.value) })
                                    }
                                />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                Esta promoción aplica al mismo producto.
                            </Form.Text>
                        </>
                    )}

                    {promotion.type === "2" && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad que se entrega(X)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={promotion.value}
                                    onChange={(e) =>
                                        setPromotion({ ...promotion, value: Number(e.target.value) })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad que se paga (El mas caro) (Y)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={promotion.extra}
                                    onChange={(e) =>
                                        setPromotion({ ...promotion, extra: Number(e.target.value) })
                                    }
                                />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                Esta promoción aplica a productos distintos.
                            </Form.Text>
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Crear promoción
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
