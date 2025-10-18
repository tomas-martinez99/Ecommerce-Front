import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useProduct } from '../../../../hooks/products/useProducts';


const UpdateProduct = ({ show, onHide, product, providers, refetch, onUpdate }) => {

    const { data: productData, isLoading } = useProduct(product?.id, show);

    const [form, setForm] = useState({
        productName: '',
        description: '',
        price: '',
        cost: '',
        stock: '',
        providerId: '',
        brand: '',
        familyGroup: ''
    });

   useEffect(() => {
        console.log('Product data changed:', productData);
        // Actualiza el formulario con los datos completos del producto
        if (productData) {
            setForm({
                productName: productData.productName || '',
                description: productData.description || '',
                price: productData.price || '',
                cost: productData.cost || '',
                stock: productData.stock || '',
                providerId: productData.providerId || '',
                brand: productData.brand || '',
                familyGroup: productData.familyGroup || ''
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (onUpdate && product?.id) {
            onUpdate(product.id, form, {
                onSuccess: () => {
                    if (refetch) refetch();
                    onHide();
                }
            });
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center py-5">Cargando datos...</div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="productName"
                                placeholder="Nombre del producto"
                                value={form.productName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="description"
                                placeholder="Descripción"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="price"
                                placeholder="Precio"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="cost"
                                placeholder="Costo"
                                type="number"
                                value={form.cost}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name="providerId"
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
                                name="stock"
                                placeholder="Stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="brand"
                                placeholder="Marca"
                                value={form.brand}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="familyGroup"
                                placeholder="Familia De Producto"
                                value={form.familyGroup}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

UpdateProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    product: PropTypes.object,
    providers: PropTypes.object,
    refetch: PropTypes.func,
    onUpdate: PropTypes.func // Debes pasar la función para actualizar el producto
};

export default UpdateProduct;