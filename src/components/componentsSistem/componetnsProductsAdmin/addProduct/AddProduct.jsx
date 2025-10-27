import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCreateProduct } from '../../../../hooks/products/useProducts';

const AddProduct = ({ show, onHide, providers, refetch }) => {
    const [form, setForm] = useState({
        SKU: '',
        productName: '',
        description: '',
        price: '',
        cost: '',
        stock: '',
        providerId: '',
        brand: '',
        familyGroup: ''
    });

    const { mutate, isLoading } = useCreateProduct();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Datos enviados:", form);
        mutate(form, {
            onSuccess: () => {
                setForm({
                    productName: '',
                    description: '',
                    price: '',
                    cost: '',
                    stock: '',
                    providerId: '',
                    brand: '',
                    familyGroup: ''
                })
                if (refetch) refetch();
                onHide();
            },
            onError: (error) => {
                alert(error.message);
            }
        });
    }
     const handleClose = () => {
            setForm({
                productName: '',
                description: '',
                price: '',
                cost: '',
                stock: '',
                providerId: '',
                brand: '',
                familyGroup: ''
            });
            onHide();
        };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='SKU'
                                placeholder="Codigo del producto"
                                value={form.SKU}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='productName'
                                placeholder="Nombre del producto"
                                value={form.productName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='description'
                                placeholder="descripcion"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='price'
                                placeholder="Precio" type="number"
                                value={form.price}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='cost'
                                placeholder="Costo" type="number"
                                value={form.cost}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='stock'
                                placeholder="Stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name='providerId'
                                value={form.providerId}
                                onChange={handleChange}
                            >
                                <option value="">Proveedor</option>
                                {(Array.isArray(providers?.items) ? providers.items : []).map(prov => (
                                    <option key={prov.id} value={prov.id}>
                                        {prov.providerName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='brand'
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="Marca" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='familyGroup'
                                value={form.familyGroup}
                                onChange={handleChange}
                                placeholder="Familia De Producto" />
                        </Form.Group>
                        <Button variant="primary" type='submit' disabled={isLoading}>
                            Crear Producto
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default AddProduct;

AddProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    providers: PropTypes.array,
    refetch: PropTypes.func // Puede ser array de objetos o vacío
};