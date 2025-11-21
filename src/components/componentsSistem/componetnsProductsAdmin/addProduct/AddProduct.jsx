import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCreateProduct } from '../../../../hooks/products/useProducts';
import { useProviders } from '../../../../hooks/providers/useProviders';
import { useBrands } from '../../../../hooks/brands/useBrands';
import { useProductGroups } from '../../../../hooks/productGroups/useProductGroups';
import { normalizeProduct } from '../../../../services/helper/normalizeProduct';


const AddProduct = ({ show, onHide, refetch }) => {
    const { data: providers } = useProviders();
    const { data: brands } = useBrands();
    const { data: productGroups } = useProductGroups();

    const [form, setForm] = useState({
        SKU: '',
        productName: '',
        description: '',
        price: 0,
        cost: 0,
        stock: 0,
        providerId: '',
        brandId: '',
        productGroupId: ''
    });

    const resetForm = () => ({
        SKU: '',
        productName: '',
        description: '',
        price: 0,
        cost: 0,
        stock: 0,
        providerId: '',
        brandId: '',
        productGroupId: ''
    });

    const { mutate, isLoading } = useCreateProduct();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: ["providerId", "brandId", "productGroupId"].includes(name)
                ? parseInt(value) || ""
                : value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = normalizeProduct(form);
        console.log("Datos enviados:", payload);
        mutate(payload, {
            onSuccess: () => {
                setForm(resetForm());
                if (refetch) refetch();
                onHide();
            },
            onError: (error) => {
                alert(error.message);
            }
        });
    };

    const handleClose = () => {
        setForm(resetForm());
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
                                {(Array.isArray(providers?.items) ? providers.items : Array.isArray(providers) ? providers : []).map(bra => (
                                    <option key={bra.id} value={bra.id}>
                                        {bra.providerName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name='brandId'
                                value={form.brandId}
                                onChange={handleChange}
                            >
                                <option value="">Marcas</option>
                                {(Array.isArray(brands?.items) ? brands.items : Array.isArray(brands) ? brands : []).map(bra => (
                                    <option key={bra.id} value={bra.id}>
                                        {bra.brandName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name='productGroupId'
                                value={form.productGroupId}
                                onChange={handleChange}
                            >
                                <option value="">Categorias</option>
                                {(Array.isArray(productGroups?.item) ? productGroups.item : Array.isArray(productGroups) ? productGroups : []).map(pg => (
                                    <option key={pg.id} value={pg.id}>
                                        {pg.name}
                                    </option>
                                ))}
                            </Form.Select>
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
    refetch: PropTypes.func // Puede ser array de objetos o vacío
};