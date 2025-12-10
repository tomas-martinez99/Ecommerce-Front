import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCreateBrand } from '../../../../hooks/brands/useBrands';

const AddBrand = ({ show, onHide, refetch }) => {
    const [form, setForm] = useState({
        brandName: ''
    });

    const { mutate, isLoading } = useCreateBrand();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", form);
        mutate(form, {
            onSuccess: () => {
                if (refetch) refetch();
                onHide();
            },
            onError: (error) => {
                alert(error.message);
            }
        });
    };

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear marca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name='brandName'
                                placeholder="Nombre de la marca"
                                value={form.brandName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit' disabled={isLoading}>
                            Crear Marca
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddBrand;

AddBrand.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    refetch: PropTypes.func
};
